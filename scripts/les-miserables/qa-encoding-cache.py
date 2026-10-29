"""Exercise byte-based encoding reuse without changing selected image bytes."""
import contextlib
import importlib.util
import io
import json
from pathlib import Path
from unittest.mock import patch
from PIL import Image

root = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('lesmis_compress_art', root / 'compress-art.py')
encoder = importlib.util.module_from_spec(spec)
spec.loader.exec_module(encoder)
report = root / 'ART_ENCODING.json'
before_report = report.read_bytes()
target = root / json.loads(before_report)['images'][0]['target']
before_target = target.read_bytes()
save = Image.Image.save
calls = []


def counted_save(image, *args, **kwargs):
    calls.append(str(args[0]))
    return save(image, *args, **kwargs)


try:
    with patch.object(Image.Image, 'save', counted_save), contextlib.redirect_stdout(io.StringIO()):
        encoder.main()
        unchanged_encodes = len(calls)
        assert unchanged_encodes == 0, 'Unchanged current bytes should be reused'
        corrupt = bytearray(before_target)
        corrupt[-1] ^= 1
        target.write_bytes(corrupt)
        encoder.main()
        repair_encodes = len(calls)
        assert repair_encodes == 1, 'A changed target must be re-encoded, not accepted from cache'
    assert target.read_bytes() == before_target, 'Fresh encoding must restore the selected bytes'
    assert report.read_bytes() == before_report, 'Cache and fresh-encoding reports must be identical'
    evidence = {'unchangedEncodes': unchanged_encodes, 'corruptTargetEncodes': repair_encodes,
                'selectedBytesRestored': True, 'reportByteIdentical': True}
    (root / 'qa' / 'encoding-cache-proof.json').write_text(json.dumps(evidence, indent=2) + '\n', encoding='utf-8')
    print(json.dumps(evidence))
finally:
    target.write_bytes(before_target)
    report.write_bytes(before_report)
