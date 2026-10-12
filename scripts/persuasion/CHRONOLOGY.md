# Chronology audit

The PWK uses one timeline because the novel’s action is a single forward narrative. Chapter IV’s broken engagement and Chapter XXI’s account of Mr Elliot’s conduct remain framed recollections at the narrative moment when Anne and the reader learn them. They are not turned into false physical flashbacks.

Day 0 is an editorial position for the opening summer of 1814, not a claimed exact date. Chapter anchors are: opening and retrenchment 0–5; departure near Michaelmas 20; Uppercross and Wentworth’s return 23–40; Lyme excursion and accident 43–44, aligned with the novel’s November weather; post-Lyme recovery and Christmas 47–65; Bath arrival and first month 85–115; Mary’s letter dated 1 February and the final Bath sequence 125–132. Equal fractional steps within a chapter preserve source order without inventing clock times.

`generate.mjs` calculates every `travelDays` value from adjacent positions. `validate-book.mjs` rejects negative elapsed time, reversed events, and non-finite positions.
