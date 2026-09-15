# The Phantom of the Opera — QA record

- Complete source narrative: 85,371 words across the Prologue, 26 chapters, and Epilogue; generator performs a normalized source-to-scenes equality check.
- Structure: 28 chapters, 83 events, 83 scene drafts, one timeline.
- Story data: 19 characters, 37 locations, 16 items, relationships and relationship snapshots, plot threads, lore, factions and memberships, knowledge and reveals, goals, motifs, routes, and event tension.
- Character continuity: snapshots exist only for characters involved in the corresponding event and contain event-specific state notes.
- Calendar: all events use numeric day pins; the 1881 central action and later documentary frames render without `NaN` dates.
- Artwork: 80 repository-hosted generated illustrations; character and item files are distinct; no photos, maps-as-entity-art, or cartoon treatments.
- Map hierarchy: France and Paris → Palais Garnier → Stage and Upper Works → Opera Cellars → House on the Underground Lake → Torture Chamber, plus Opera Roof under the stage layer.
- Visual map pass: every one of the seven layers was loaded in PlotWeave; map images, gateways, and location markers were inspected at the fitted application scale.
- Application pass: catalogue download/replace, reading-mode filtering, timeline, complete manuscript, characters, calendar, maps, items, relationships, character arc, lore, factions, knowledge, corkboard, and structure were opened without a story-data runtime exception.
- Known application issue observed during QA: map playback can stall on a blank Leaflet canvas while changing layers and log `_leaflet_pos` from Leaflet. Manual layer changes load every map correctly, so this is recorded as an application playback defect rather than a missing or broken library asset.
