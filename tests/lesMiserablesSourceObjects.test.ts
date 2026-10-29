import{expect,test}from'vitest'
import{itemDefinitions}from'../scripts/les-miserables/item-ledger.mjs'

test('describes the purchased petticoat and valise-sized coffer without changing their source facts',()=>{
 expect(itemDefinitions.get('fantine-knitted-petticoat').description).toMatch(/purchases/)
 expect(itemDefinitions.get('fantine-knitted-petticoat').description).not.toMatch(/makes/)
 expect(itemDefinitions.get('courfeyrac-barricade-coffer').description).toMatch(/large valise/)
})
