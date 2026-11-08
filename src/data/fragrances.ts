import { Fragrance } from '../types';

export const HERO_CAP_IMAGE = '/src/assets/images/hero_cap_engraved_1794133615535.jpg';

export const FRAGRANCES: Fragrance[] = [
  {
    id: 'vernal-bloom',
    slug: 'vernal-bloom',
    name: 'Vernal Bloom',
    frenchName: "L'Éveil Printanier",
    season: 'Spring',
    subtitle: 'The Elements of Awakening',
    tagline: 'Misty mossy stones, white petals, and dawn rain.',
    price50ml: 290,
    price100ml: 380,
    concentration: 'Extrait de Parfum · 30% Essence',
    family: 'Fresh Floral Aquatic',
    image: '/src/assets/images/perfume_spring_bloom_1794133616428.jpg',
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    ambientGradient: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.18) 0%, rgba(6, 78, 59, 0.08) 50%, transparent 80%)',
    description: 'A diaphanous awakening. Smoky semi-transparent obsidian glass rests upon wet emerald moss beds. The air is cold, drenched in petrichor and budding white blossoms opening under morning rain.',
    atmosphere: 'Dense dew clinging to ancient stones in the Grasse foothills at 05:40 AM.',
    story: 'Vernal Bloom captures the exact second when dormant roots drink the first rainfall of the vernal equinox. Cold wild bergamot gives way to an aquatic heart of crushed lily of the valley and young white camellia, grounding into damp mineral vetiver.',
    craftsmanshipDetail: 'Hydro-distilled using micro-filtered Alpine rainwater collected exclusively during the March equinox.',
    extractionMethod: 'Sub-ambient Cold Enfleurage & Pure Hydro-Distillation',
    longevity: '14+ Hours on Skin',
    sillage: 'Airy & Magnetic (6 ft radius)',
    notes: {
      top: [
        { name: 'Crisp Bergamot', category: 'top', description: 'Sunlit and zesty with a dewy bitter rind opening', origin: 'Reggio Calabria, Italy' },
        { name: 'Dewy White Petals', category: 'top', description: 'Translucent morning camellia and neroli flowers', origin: 'Grasse, France' },
        { name: 'Fresh Spring Rain', category: 'top', description: 'Photorealistic mineral petrichor and ozone moisture', origin: 'Vercors Plateau' }
      ],
      heart: [
        { name: 'Valley Lily', category: 'heart', description: 'Pure green floral bells with crisp vegetal facets', origin: 'Dordogne Valley' },
        { name: 'Japanese Green Tea', category: 'heart', description: 'Steamed Sencha leaf providing delicate tannins', origin: 'Shizuoka, Japan' },
        { name: 'Neroli Blossom', category: 'heart', description: 'Honeyed bitter orange flower in early bloom', origin: 'Cap d’Antibes' }
      ],
      base: [
        { name: 'Wet Vetiver', category: 'base', description: 'Earthy, peaty root accord steeped in spring mud', origin: 'Les Cayes, Haiti' },
        { name: 'White Cedar', category: 'base', description: 'Silky pale wood resembling sunlit bark', origin: 'Atlas Mountains' },
        { name: 'Silver Ambergris', category: 'base', description: 'Salty mineral warmth binding the floral vapor', origin: 'Sustainably collected Oceanic' }
      ]
    },
    accords: [
      { name: 'Floral Petrichor', percentage: 92 },
      { name: 'Crisp Citrus', percentage: 84 },
      { name: 'Wet Green Moss', percentage: 76 },
      { name: 'Mineral Wood', percentage: 65 }
    ],
    characteristics: ['Awakening', 'Diaphanous', 'Luminous', 'Petrichor']
  },
  {
    id: 'solar-solstice',
    slug: 'solar-solstice',
    name: 'Solar Solstice',
    frenchName: 'Le Zénith Solaire',
    season: 'Summer',
    subtitle: 'The Elements of Radiance',
    tagline: 'Sun-baked driftwood, sea salt crust, and solar jasmine.',
    price50ml: 310,
    price100ml: 410,
    concentration: 'Extrait de Parfum · 32% Essence',
    family: 'Solar Citrus Marine',
    image: '/src/assets/images/perfume_summer_solstice_1794133618588.jpg',
    accentColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    ambientGradient: 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.20) 0%, rgba(180, 83, 9, 0.10) 50%, transparent 80%)',
    description: 'An incandescence of radiant light. The dark glass bottle sits warm upon sun-bleached coastal driftwood, with saline condensation beading down the amber flanks as the golden sun slips into the horizon.',
    atmosphere: 'The blinding Mediterranean shoreline at 3:00 PM, radiating heat and oceanic salt.',
    story: 'Conceived to evoke the eternal golden hour. Solar Solstice blends sun-baked citrus peels with sea salt crystals and night-blooming jasmine that absorbed twelve hours of direct ultraviolet radiation.',
    craftsmanshipDetail: 'Macerated for 90 days in custom ceramic amphoras heated exclusively by natural Mediterranean sun.',
    extractionMethod: 'Solar Maceration & Supercritical CO2 Fractionation',
    longevity: '16+ Hours on Skin',
    sillage: 'Expansive & Golden (8 ft radius)',
    notes: {
      top: [
        { name: 'Sun-Baked Citrus Rind', category: 'top', description: 'Candied blood orange and wild Amalfi lemon rind', origin: 'Sorrento, Italy' },
        { name: 'Sea Salt Crystals', category: 'top', description: 'Coarse fleur de sel dried on granite ocean reefs', origin: 'Guérande, Brittany' },
        { name: 'Crushed Pink Pepper', category: 'top', description: 'Effervescent dry spice offering immediate lift', origin: 'Reunion Island' }
      ],
      heart: [
        { name: 'Solar Jasmine', category: 'heart', description: 'Indolic Grandiflorum harvested at peak noon', origin: 'Grasse Estate Reserve' },
        { name: 'Orange Blossom', category: 'heart', description: 'Golden honeyed floral warmth with citrus undertones', origin: 'Seville, Spain' },
        { name: 'Corsican Immortelle', category: 'heart', description: 'Sun-drenched golden herbal straw and maple nuances', origin: 'Cap Corse' }
      ],
      base: [
        { name: 'Bleached Driftwood', category: 'base', description: 'Salt-cured teak and cedar baked on coastal shores', origin: 'Ligurian Coast' },
        { name: 'Warm Amber Resin', category: 'base', description: 'Gooey golden balsamic nectar radiating body heat', origin: 'Baltic fossil resin' },
        { name: 'Mysore Sandalwood', category: 'base', description: 'Creamy, lactonic vintage wood providing eternal depth', origin: 'Karnataka, India' }
      ]
    },
    accords: [
      { name: 'Solar Amber', percentage: 95 },
      { name: 'Saline Citrus', percentage: 88 },
      { name: 'Bleached Wood', percentage: 79 },
      { name: 'Golden Florals', percentage: 72 }
    ],
    characteristics: ['Incandescent', 'Saline', 'Magnetic', 'Golden']
  },
  {
    id: 'equinox-smoke',
    slug: 'equinox-smoke',
    name: 'Equinox Smoke',
    frenchName: "La Fumée d'Équinoxe",
    season: 'Autumn',
    subtitle: 'The Elements of Transformation',
    tagline: 'Wisps of aromatic smoke, roasted cardamom, and cracked obsidian.',
    price50ml: 320,
    price100ml: 420,
    concentration: 'Extrait de Parfum · 33% Essence',
    family: 'Smoky Woody Oriental',
    image: '/src/assets/images/perfume_autumn_equinox_1794133616543.jpg',
    accentColor: '#ea580c',
    glowColor: 'rgba(234, 88, 12, 0.35)',
    ambientGradient: 'radial-gradient(circle at 50% 50%, rgba(234, 88, 12, 0.22) 0%, rgba(124, 45, 18, 0.12) 50%, transparent 80%)',
    description: 'An atmospheric descent into mystery. Smoldering copper rim lighting illuminates delicate ribbons of incense rising from a bottle perched on shattered black volcanic stone.',
    atmosphere: 'A secluded stone hearth in a cedar forest at dusk, the temperature plunging fast.',
    story: 'Equinox Smoke traces the shift from golden warmth to the smoky chill of twilight. Cracked Guatemala cardamom pods release dry aromatics, swallowed by slow-burning Virginian cedar logs, smoked vetiver roots, and black vanilla.',
    craftsmanshipDetail: 'Aged for 12 weeks in charred French oak casks previously seasoned with smoked lapsang souchong tea.',
    extractionMethod: 'Supercritical CO2 Extraction & Cask Wood Pyrolysis',
    longevity: '18+ Hours on Skin',
    sillage: 'Intimate & Hypnotic (5 ft radius)',
    notes: {
      top: [
        { name: 'Green Cardamom', category: 'top', description: 'Crushed aromatic seed pods with resinous camphor', origin: 'Alta Verapaz, Guatemala' },
        { name: 'Black Fig Skin', category: 'top', description: 'Velvety dark fruit flesh roasted over charcoal', origin: 'Provence, France' },
        { name: 'Smoked Saffron', category: 'top', description: 'Leather and metallic red threads kissed with fire', origin: 'Khorasan, Iran' }
      ],
      heart: [
        { name: 'Smoked Vetiver', category: 'heart', description: 'Java vetiver roots slowly dried over smoldering peat', origin: 'Java, Indonesia' },
        { name: 'Kyara Incense', category: 'heart', description: 'Ancient agarwood smoke with mystical balsamic quiet', origin: 'Nara, Japan' },
        { name: 'Cured Tobacco Leaf', category: 'heart', description: 'Rich honeyed leaf cured in dark barn rafters', origin: 'Vuelta Abajo, Cuba' }
      ],
      base: [
        { name: 'Virginian Cedarwood', category: 'base', description: 'Deep red cedar heartwood with aromatic pencil shaving notes', origin: 'Appalachian Highlands' },
        { name: 'Obsidian Amber', category: 'base', description: 'Dark mineral resin with tar and sweet labdanum depths', origin: 'Extremadura, Spain' },
        { name: 'Smoked Bourbon Vanilla', category: 'base', description: 'Black oily pods infused with charred barrel wood', origin: 'Sava Region, Madagascar' }
      ]
    },
    accords: [
      { name: 'Sacred Smoke', percentage: 96 },
      { name: 'Warm Spicy Wood', percentage: 90 },
      { name: 'Obsidian Balsam', percentage: 82 },
      { name: 'Leather Tobacco', percentage: 74 }
    ],
    characteristics: ['Atmospheric', 'Smoldering', 'Enigmatic', 'Resinous']
  },
  {
    id: 'crystalline-frost',
    slug: 'crystalline-frost',
    name: 'Crystalline Frost',
    frenchName: 'Le Givre Céleste',
    season: 'Winter',
    subtitle: 'The Elements of Solitude',
    tagline: 'Cracked crystal ice, royal white oud, and frozen ozone.',
    price50ml: 340,
    price100ml: 450,
    concentration: 'Extrait de Parfum · 35% Essence',
    family: 'Glacial Resinous Wood',
    image: '/src/assets/images/perfume_winter_frost_1794133617547.jpg',
    accentColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.35)',
    ambientGradient: 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.20) 0%, rgba(14, 116, 144, 0.10) 50%, transparent 80%)',
    description: 'A monument of glacial purity. Suspended within an architectural monolith of fractured ice, the dark flacon radiates an icy silver and midnight blue glow, echoing the absolute stillness of sub-zero night.',
    atmosphere: 'High mountain peaks under starlight, breath crystallizing instantaneously in -20°C air.',
    story: 'Crystalline Frost captures absolute stillness. A sharp inhalation of frozen ozone and frosted peppermint fractures into rare crystalline white oud—pale, clean, and celestial—anchored by sacred Hojari frankincense tears.',
    craftsmanshipDetail: 'Cryo-distilled at -18°C using molecular vacuum trapping to capture hyper-volatile aromatic ethers.',
    extractionMethod: 'Cryogenic Vacuum Fractional Distillation',
    longevity: '20+ Hours on Fabric & Skin',
    sillage: 'Stark & Architectural (7 ft radius)',
    notes: {
      top: [
        { name: 'Frozen Ozone', category: 'top', description: 'Stark, metallic alpine air at 4,000 meters elevation', origin: 'Mont Blanc Massif' },
        { name: 'Glacial Peppermint', category: 'top', description: 'Pure menthol crystals delivering a sub-zero shock', origin: 'Willamette Valley, Oregon' },
        { name: 'Frosted Pine Needles', category: 'top', description: 'Brittle pine needles coated in white rime ice', origin: 'Rovaniemi, Lapland' }
      ],
      heart: [
        { name: 'Royal White Oud', category: 'heart', description: 'Ultra-rare pale aquilaria wood, completely devoid of animalic funk', origin: 'Trat Reserve, Thailand' },
        { name: 'Frankincense Tears', category: 'heart', description: 'Green Hojari resin with lemon-pine clarity and temple solemnity', origin: 'Dhofar, Sultanate of Oman' },
        { name: 'Silver Orris Root', category: 'heart', description: 'Aged 6 years to produce powdery, cold metallic violet suede', origin: 'Florence, Italy' }
      ],
      base: [
        { name: 'Siberian Fir Balsam', category: 'base', description: 'Dark evergreen resin frozen into aromatic amber drops', origin: 'Taiga, Siberia' },
        { name: 'Cashmere Musk', category: 'base', description: 'Clean second-skin musk evocative of heavy wool blankets', origin: 'Alpine Laboratory Blend' },
        { name: 'Glacial Minerals', category: 'base', description: 'Pure wet slate and granite bedrock after frost melt', origin: 'Norwegian Fjords' }
      ]
    },
    accords: [
      { name: 'Frozen Ozone', percentage: 94 },
      { name: 'Royal White Oud', percentage: 89 },
      { name: 'Incense Tears', percentage: 83 },
      { name: 'Glacial Woods', percentage: 77 }
    ],
    characteristics: ['Architectural', 'Sub-Zero', 'Celestial', 'Pristine']
  }
];

export const DISCOVERY_COFFRET = {
  id: 'discovery-quadrilogy',
  slug: 'discovery-quadrilogy',
  name: 'The Four Elements Coffret',
  frenchName: 'Le Coffret Quadrilogie',
  tagline: 'All four seasonal extractions in 10ml travel flacons.',
  price: 135,
  concentration: '4 × 10ml Extrait de Parfum',
  description: 'An elemental journey across the four solstices. Housed in a custom magnetic obsidian presentation box lined with brushed brass and numbered by hand.',
  image: '/src/assets/images/perfume_summer_solstice_1794133618588.jpg'
};
