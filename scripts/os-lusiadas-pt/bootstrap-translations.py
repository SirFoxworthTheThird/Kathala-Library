"""One-time translation draft. The release generator uses frozen translations.json."""
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
import json
import re
import time
import requests

HERE = Path(__file__).resolve().parent
WORLD = json.loads((HERE.parents[1] / 'library/os-lusiadas.pwk').read_text(encoding='utf-8'))
FIELDS = {
    'world': {'description'},
    'timelines': {'name', 'description'},
    'chapters': {'synopsis', 'notes'},
    'events': {'title', 'description', 'notes'},
    'mapLayers': {'name', 'description', 'levelLabel'},
    'locationMarkers': {'name', 'description'},
    'characters': {'name', 'description'},
    'characterSnapshots': {'inventoryNotes', 'statusNotes'},
    'items': {'name', 'description'},
    'itemPlacements': {'notes'},
    'relationships': {'label', 'description'},
    'relationshipSnapshots': {'label', 'description'},
    'plotThreads': {'name', 'description'},
    'motifs': {'name', 'description'},
    'knowledgeFacts': {'title', 'description'},
    'knowledgeReveals': {'note'},
    'factions': {'name', 'description'},
    'factionMemberships': {'role', 'notes'},
    'characterGoals': {'text'},
    'loreCategories': {'name', 'description'},
    'lorePages': {'title', 'body'},
    'locationSnapshots': {'status', 'notes'},
    'itemSnapshots': {'condition', 'notes'},
}

entries = {}
for collection, fields in FIELDS.items():
    records = [WORLD[collection]] if collection == 'world' else WORLD[collection]
    for record in records:
        for field in fields:
            source = record.get(field)
            if isinstance(source, str) and source:
                key = f'{collection}/{record["id"]}/{field}'
                entries[key] = source

unique = sorted(set(entries.values()))
groups = []
group = []
length = 0
for source in unique:
    if group and length + len(source) > 2600:
        groups.append(group)
        group = []
        length = 0
    group.append(source)
    length += len(source) + 18
if group:
    groups.append(group)

def translate(group):
    labels = [f'<<<SEG_{i:04d}>>>' for i in range(1, len(group))]
    query = '\n'.join(part for pair in zip(group, labels + ['']) for part in pair if part)
    for attempt in range(5):
        try:
            response = requests.get('https://translate.googleapis.com/translate_a/single', params={
                'client': 'gtx', 'sl': 'en', 'tl': 'pt-PT', 'dt': 't', 'q': query,
            }, timeout=45)
            response.raise_for_status()
            output = ''.join(part[0] for part in response.json()[0])
            pattern = r'\s*<<<SEG_\d{4}>>>\s*'
            pieces = re.split(pattern, output)
            if len(pieces) != len(group):
                raise ValueError(f'Segment mismatch: {len(pieces)} != {len(group)}')
            return dict(zip(group, (piece.strip() for piece in pieces)))
        except (requests.RequestException, ValueError) as error:
            if attempt == 4:
                raise RuntimeError(f'Translation batch failed: {error}') from error
            time.sleep(2 ** attempt)

translated = {}
with ThreadPoolExecutor(max_workers=5) as pool:
    futures = [pool.submit(translate, group) for group in groups]
    for index, future in enumerate(as_completed(futures), 1):
        translated.update(future.result())
        if index % 10 == 0 or index == len(groups):
            print(f'{index}/{len(groups)} batches translated', flush=True)

result = {key: {'source': source, 'pt': translated[source]} for key, source in entries.items()}
(HERE / 'translations.json').write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'{len(result)} localized fields; {len(unique)} unique source strings')
