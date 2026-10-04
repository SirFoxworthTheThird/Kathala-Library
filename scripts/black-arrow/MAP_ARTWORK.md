# Illustrated map artwork

Each map image was generated separately with OpenAI image generation on 2026-10-03, inspected at native resolution, and retained as a distinct asset in `library/black-arrow/maps/illustrated/`. The map layers in the PWK reference these PNGs directly. The generated illustrations are interpretive geography; regional distances and all interior floorplans are approximate or invented. Location markers are editor coordinates measured upward from each image's bottom edge.

| Map | Prompt brief | Visual review |
| --- | --- | --- |
| `region.png` | Overhead hand-inked historical atlas, 15th-century English river valley, Tunstall west, moated manor southwest, forest, fen below the River Till, Holywood abbey lower left, Shoreby on the eastern coast, roads and crossings, without lettering. | River, wetland, inland settlements, abbey, and walled coastal town are distinct. |
| `village.png` | Overhead parchment atlas of Tunstall, house northwest, church northeast, green central, cottages and rising road, bridge at lower edge, without lettering. | House, church, green, and bridge are visibly separate. |
| `forest.png` | Overhead atlas of dense English oak forest, outlaw camp upper right, ridge upper middle, stream lower left, hillside center, road lower middle, hidden den upper left, without lettering. | Clear road, stream, ridge, camp, and den permit distinct markers. |
| `moat.png` | Overhead moated 15th-century manor and architectural plan, gate lower left, hall center, chapel right, upper room inset, hidden passage lower right, without lettering. | Main rooms, water barrier, gate, and detached inset are legible; interior layout is invented. |
| `shoreby.png` | Overhead coastal walled town, sea and harbour left and below, abbey upper right, noble residence center right, streets, downs and eastern gate, without lettering. | Harbour, abbey, noble residence, town wall, and roads are distinct. |
| `ship.png` | Overhead late-medieval merchant ship deck, mast, bow, stern cabin, hatch, rigging and surrounding sea, without lettering. | Deck regions and vessel outline are clear; vessel plan is invented. |
| `shoreby-house.png` | Overhead noble townhouse floorplan with guarded lower-left entrance, central hall, stair, chamber lower right and upper room inset, without lettering. | Stair, entrance, hall, and chamber are distinguishable; floorplan is invented. |
| `shoreby-abbey.png` | Overhead abbey floorplan, nave left, choir center, cloister right, chamber upper right, passages and garden, without lettering. | Long church, cloister and chamber are distinct; floorplan is invented. |
| `holywood.png` | Overhead rural abbey grounds, church center left, cloister and refectory right, gate and approach lower left, garden and woodland, without lettering. | Church, cloister, refectory, garden and gate are visible; layout is invented. |

All nine images passed visual inspection for coherent cartography, separate compositions, absence of stray lettering, and useful landmark placement. No corrections or regeneration were needed. Source generation filenames and final file SHA-256 hashes are recorded by `map-manifest.mjs`.

| Final file | Generation source | SHA-256 |
| --- | --- | --- |
| `region.png` | `exec-934e9d36-7009-405d-9bc6-91bc1a281128.png` | `90349e40e5d3ae7d7baf7757bf7fbe713d0eaed418f33fac46c99a098c53324e` |
| `village.png` | `exec-d5a95ab8-8987-4689-a640-8808c03a9550.png` | `01f6c2359ba42296ae63cc6411236eecd459dc1b5c4d26a1f91e4d35f1bd50d6` |
| `forest.png` | `exec-1541b26d-45f8-4fa8-8cb8-59470012677d.png` | `423354dd6951a8e1251ea658d8b0a4368c4b01e7495e3c139051d0a218c97755` |
| `moat.png` | `exec-3dd85bd5-130a-41cd-9398-7fe03beaebef.png` | `e7eee224bcc26a0f0bc4a262685bb6c21f1bd9d9bc573f47d7335916fa736886` |
| `shoreby.png` | `exec-92ab02ee-77b1-46b5-8385-0f142b84c952.png` | `891ecc81d9eff5795c13a8253011ad1aa77cee06858945b11781d08327215987` |
| `ship.png` | `exec-1ab76055-377f-49fa-8588-28f53b22feff.png` | `87da1f90ffea879e13cc73d1a85011a82417af66c2843e0998af3a5683733473` |
| `shoreby-house.png` | `exec-1bf123fb-eb9b-486c-9b75-190aeef26a9a.png` | `a90c09ef099b376410a96eaab971b2def22dcd690677422ab4d614038122a623` |
| `shoreby-abbey.png` | `exec-91aaa198-2eb2-455e-b27b-f9a826d8b5ee.png` | `f5b11160216097332b4e615336597e51c2cee6dcbef46bdd3abced30ccfb8d4a` |
| `holywood.png` | `exec-338e2b7b-b04b-486a-bbd7-bf84234bdcf5.png` | `921943e443d5dc6d551fffcf4421bb840cb6b8ea517d5d329e1bee10c142e23c` |
