# Little Women visual direction

All generated art uses a mature American-realist literary style grounded in the 1860s. Domestic scenes favor restrained warmth, real wood, worn textiles, winter light, and practical clothing. European scenes may be more polished but must remain historically plausible. Character faces, ages, silhouettes, poses, and palettes must remain distinct; groups and unnamed collectives receive scene illustrations rather than misleading individual portraits.

Maps use hand-painted topography or architectural watercolor with deterministic labels added after generation. They must function as maps at normal Kathala zoom, maintain clear zones for markers, and avoid pseudo-text, modern geography, decorative-only compositions, and childlike treasure-map styling.

Every final asset is generated separately or deliberately depicts a named inseparable group. No map is reused as an entity illustration. Visual approval is recorded against the exact file hash in `art-review.json`.

Published character and item artwork is encoded as WebP quality 85, location artwork at quality 88, and final maps at quality 90 to preserve labels and fine routes. Lossless generated-art sources and unlabeled map bases live under this authoring directory rather than the public `library/` tree. The compression review compares every published image with its lossless source and records the exact before/after byte counts in `art-review.json`.
