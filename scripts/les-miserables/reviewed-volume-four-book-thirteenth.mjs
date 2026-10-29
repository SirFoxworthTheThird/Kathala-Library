const part = (at, title, description, location, reason, extra = {}) => ({
  at, title, description, location, present: [], reason, kind: 'reported', ...extra,
})

export const volumeFourBookThirteenthReview = [
  [285, [
    part('start', 'I Will Go', 'Marius leaves the garden in despair and sets off for the barricade carrying Javert’s pistols.', 'rue-plumet-garden-gate',
      'Paragraphs 0–3 resume the summons, not a second departure from the garden. His wish to die is intent, not a death. The apparent young messenger has vanished; the tomb and its key are metaphors.', { kind: 'scene', items: ['javert-signal-pistols'], present: [
        ['marius', 'Accepts the summons, leaves through the bar opening and sets out armed.'],
      ] }),
    part(4, 'Across the Still-Lighted City', 'Marius crosses the Invalides bridge and reaches the illuminated shops of Rivoli and Saint-Honoré.', 'rue-rivoli',
      'Paragraph 4 describes the route from the boulevard to Rivoli. The people eating cakes and ices do not feed Marius.', { kind: 'scene', present: [
        ['marius', 'Crosses the Invalides bridge and the Champs-Élysées to reach Rivoli’s open, lighted shops.'],
      ] }),
    part(5, 'Into Saint-Honoré', 'Marius turns through Passage Delorme and follows Saint-Honoré as the shops darken and the crowd thickens.', 'rue-saint-honore',
      'Paragraphs 5–7 are a continuous walk toward the Arbre-Sec fountain. The cavalry at Palais-Royal does not arrest him.', { kind: 'scene', present: [
        ['marius', 'Follows Saint-Honoré beyond the lighted windows and reaches the gloomy groups near the fountain.'],
      ] }),
    part(8, 'The Crowd at Prouvaires', 'A dense crowd marks the limit beyond which troops hold the dark streets.', 'rue-prouvaires-entrance',
      'Paragraph 8 changes the character of the approach. The troops are not identified with the defenders at Chanvrerie, and no arrest takes place here.', { kind: 'scene', present: [
        ['marius', 'Reaches the packed crowd at Prouvaires before finding a way past the army’s limit.'],
      ] }),
    part(9, 'Beyond the Troops', 'Avoiding patrols, Marius circles toward the Halles and enters dark, deserted streets.', 'rue-bethisy',
      'Paragraphs 9–12 show successful passage without a confrontation. The fleeting figure’s number and sex remain unknown; do not identify it as Éponine or the earlier messenger.', { kind: 'scene', present: [
        ['marius', 'Passes the crowd and bivouac by detours and continues into the unlit streets.'],
      ] }),
    part(13, 'The Two White Horses', 'Marius climbs an abandoned barricade and encounters the released omnibus horses.', 'rue-poterie-abandoned-barricade',
      'Paragraph 13 qualifies the street as Marius’s judgment but explicitly identifies the horses from Bossuet’s omnibus. They have wandered alive all day. This abandoned barrier is not the defended Chanvrerie barricade.', { kind: 'scene', present: [
        ['marius', 'Feels his way over the wagon and stones and approaches the two waiting horses.'],
      ] }),
    part(14, 'A Shot Through the Sign', 'A stray bullet passes close to Marius and pierces a barber’s suspended shaving-dish as he presses onward.', 'rue-contrat-social',
      'Paragraphs 14–17 leave the shooter unknown and the street tentative to Marius, with later narrator identification. The shot hits the brass sign, not Marius. The sign’s survival to 1848 is hindsight; this is not the pebble at the Orme-Saint-Gervais shop.', { kind: 'scene', present: [
        ['marius', 'Leaves the horses and continues after a bullet passes overhead.'],
      ] }),
  ]],
  [286, [
    part('start', 'The Imagined Aerial Observer', 'The narrator pictures the dark insurgent quarter from above, encircled by gathering troops.', 'paris-halles-quarter',
      'Paragraphs 0–3 use a hypothetical flying observer, not an actual owl, bat or airborne character. Shots at lit windows and unnamed casualties belong to the citywide survey, not a newly identified death in the principal cast.', { kind: 'exposition' }),
    part(4, 'The Two Sides Await Contact', 'The narrator describes the opposing forces’ determination and anxiety as the Saint-Merry bell sounds.', 'paris-halles-quarter',
      'Paragraphs 4–6 anticipate a decision on the following day without recording that outcome. Deadly traps and inevitable confrontation are descriptive framing, not evidence that every defender is already dead or every exit sealed.', { kind: 'exposition' }),
    part(7, 'Clouds and a Distant Voice', 'The darkened sky frames the approaching political battle and the narrator’s account of a deeper popular discontent elsewhere.', 'paris',
      'Paragraphs 7–9 move beyond the immediate battle district. The shroud, tomb, lion and thunder describe atmosphere and collective voice, not a literal burial or supernatural speaker.', { kind: 'exposition' }),
  ]],
  [287, [
    part('start', 'The Open Mondétour Approach', 'Marius follows the red glow through the Halles and Rue des Prêcheurs, unseen by the sentinel, to the open branch beside the redoubt.', 'mondetour-open-approach',
      'Paragraphs 0–5 confirm use of the route preserved in chapter 281. Marius sees part of the tavern and the smaller lamp but cannot see the large barrier or flag behind the houses. He remains outside with a step still to take; the sentinel does not challenge him.', { kind: 'scene', present: [
        ['marius', 'Moves on tiptoe to the corner and looks into the defended space from shadow.'],
      ] }),
    part(6, 'His Father and Civil War', 'Seated on a post, Marius remembers Pontmercy and recoils from the prospect of fighting fellow Frenchmen.', 'mondetour-open-approach',
      'Paragraphs 6–11 are Marius’s memory and imagined judgment. Pontmercy is dead, not standing beside him. The missing sword’s foresight and flames are personification and hypothetical imagery, not an enchanted weapon; Marius does not possess it here.', { kind: 'scene', mentioned: ['pontmercy', 'gillenormand'], present: [
        ['marius', 'Sits thinking of his father’s service and weeps over the prospect of civil war.'],
      ] }),
    part(12, 'The Arguments of Despair', 'Marius interprets Cosette’s unexplained departure as rejection and weighs his promise and loyalty to his friends against retreat.', 'mondetour-open-approach',
      'Paragraphs 12–13 expressly represent conflicting thoughts. Cosette wanting him dead or no longer loving him is his inference, not her stated wish. The father’s phantom striking him is imagined, not a ghostly encounter.', { kind: 'scene', mentioned: ['cosette', 'pontmercy'], present: [
        ['marius', 'Drops his head amid imagined accusations and fear of abandoning the friends.'],
      ] }),
    part(14, 'A Different Measure of War', 'Marius reconsiders insurrection in terms of justice and argues inwardly that its purpose can justify the struggle.', 'mondetour-open-approach',
      'Paragraphs 14–17 develop his reasoning with historical and philosophical examples. The narrator explicitly identifies this as the situation of Marius’s mind. It is not a public speech, an exchange with his father or a meeting of the historical figures named.', { kind: 'exposition', mentioned: ['marius'] }),
    part(18, 'The Dead Man at the Window', 'Still outside, Marius looks toward the quiet defenders and notices the porter’s body at the third-floor window.', 'mondetour-open-approach',
      'Paragraph 18 explicitly identifies the apparent spectator as Le Cabuc’s dead victim. Watching is an appearance, not restored life or conscious observation. The blood trail is visible evidence of the earlier killing; Marius is not yet shown entering the redoubt.', { kind: 'scene', mentioned: ['chanvrerie-tall-house-porter', 'le-cabuc'], present: [
        ['marius', 'Looks into the barricade and sees the motionless head above the street.'],
      ] }),
  ]],
]
