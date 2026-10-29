// City-scale street points are approximate geographical locators. They do not
// assert a particular doorway, patrol position or building parcel.
export const parisStreetRows=[
 ['rue-pavee','Rue Pavée','The Marais street beside the old Hôtel Lamoignon.',[1114,420]],
 ['hotel-lamoignon-street','Outside the Hôtel Lamoignon','The street frontage of the old mansion on Rue Pavée; the exact stopping point is not established.',[1120,425]],
 ['rue-lesdiguieres','Rue Lesdiguières','The street near the Bastille, reached from Rue Bassompierre.',[1190,540]],
 ['rue-billettes','Rue des Billettes','The old Marais street among the approaches to Saint-Merry.',[1060,419]],
 ['rue-chaume','Rue du Chaume','The north–south street through the old Marais district.',[1101,353]],
 ['rue-clocheperce','Rue Clocheperce','The short old street north of Saint-Paul and near Rue Saint-Antoine.',[1123,469]],
 ['rue-des-ballets-archway','The Rue des Ballets archway','An archway in the old Saint-Paul district. The city marker locates its neighborhood, not a measured aperture.',[1148,481]],
 ['rue-jean-jacques-rousseau','Rue Jean-Jacques-Rousseau','The right-bank street northwest of the central markets.',[812,258]],
 ['rue-menilmontant','Rue de Ménilmontant','The outward eastern street beyond the old central districts.',[1308,299]],
 ['rue-mouffetard','Rue Mouffetard','The crowded old southern street climbing away from the river.',[911,750]],
 ['rue-pont-aux-choux','Rue du Pont-aux-Choux','The street toward the northern boulevard edge of the Marais.',[1190,324]],
 ['boulevard-pont-aux-choux','The Pont-aux-Choux boulevard','The outer boulevard near the northern end of Rue Saint-Louis; the point denotes a stretch rather than an individual carriage.',[1220,320]],
 ['rue-rivoli','Rue de Rivoli','The right-bank street along the northern side of the Tuileries and Louvre district, before its later eastern extension.',[659,337]],
 ['rue-saint-honore','Rue Saint-Honoré','The busy right-bank street north of the Tuileries and Louvre district.',[662,297]],
 ['rue-saint-antoine','Rue Saint-Antoine','The broad old street running west from the Bastille through the Saint-Paul district.',[1198,508]],
 ['rue-saint-louis','Rue Saint-Louis','The Marais street leading toward Rue des Filles-du-Calvaire; the later Rue de Turenne name is not used here.',[1168,361]],
 ['rue-thorigny-doorway','A doorway in Rue Thorigny','A street doorway in the northern Marais. The exact house is unspecified.',[1146,365]],
 ['rue-verrerie','Rue de la Verrerie','The old street east of Saint-Merry and north of the Hôtel de Ville.',[1047,439]],
 ['rue-vieilles-haudriettes','Rue des Vieilles-Haudriettes','The northern Marais street near the printing establishment.',[1074,322]],
 ['royal-printing-guard-post','The printing-establishment post','The guard post at the Royal Printing Establishment in the old Marais; the precise doorway is editorial.',[1093,344]],
 ['enfants-rouges-street-post','The Enfants-Rouges post','A street post in the northern Marais district, represented at neighborhood scale.',[1145,300]],
 ['quai-morland','Quai Morland','The quay beside the old eastern river arm south of the Bastille.',[1113,604]],
 ['notre-dame-paris','Notre-Dame','The cathedral on the eastern end of the Île de la Cité.',[998,533]],
 ['pont-austerlitz','The Pont d’Austerlitz','The bridge joining the eastern quays near the Jardin des Plantes.',[1156,685]],
 ['pont-notre-dame-parapet','The Pont Notre-Dame quay parapet','The right-bank parapet beside Pont Notre-Dame and Place du Châtelet; the scene is on the quay, not the middle of the bridge.',[944,427]],
 ['place-de-greve','The Place de Grève','The open riverside square before the Hôtel de Ville.',[1028,474]],
 ['saint-paul-church','The church of Saint-Paul','The church on Rue Saint-Antoine in the old Saint-Paul quarter.',[1146,507]],
 ['marche-saint-jean','The Marché Saint-Jean','The old market square in the district east of the Hôtel de Ville.',[1079,445]],
 ['marais-streets','The Marais streets','The intersecting old streets around the Hôtel de Ville and Saint-Paul. This is a district locator rather than an asserted single route.',[1088,394]],
 ['rue-reuilly-building-site','The Rue de Reuilly building site','A construction site in the eastern Rue de Reuilly district; its exact property is not identified.',[1470,679]],
]
export const parisStreetLocations=parisStreetRows.map(([key,name,description])=>[key,name,description+' City-scale placement is approximate.','paris'])
export const parisStreetRegistration=Object.fromEntries(parisStreetRows.map(([key,,,point])=>[key,point]))
export const parisStreetLandmarks=Object.fromEntries(parisStreetRows.map(([key,name])=>[key,`${name}: approximate historical district/street position; no surveyed plot or action position asserted.`]))
