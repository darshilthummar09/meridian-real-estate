import { ConstructionStage } from '../types';

export const CONSTRUCTION_STAGES: ConstructionStage[] = [
  {
    id: 1,
    stepNumber: '01',
    phase: 'Site Demarcation & Oceanfront Genesis',
    title: 'The Virgin Coastline',
    subtitle: 'Preserving Natural Contours & Solar Vectors',
    timeline: 'Month 00 · Acquisition & Ground Mapping',
    progressPercent: 12,
    description:
      'The pristine 4.8-acre oceanfront cliff parcel is demarcated with precision optical survey stakes. Solar azimuth vectors, coastal breeze paths, and natural granite topography are cataloged before ground is touched.',
    architecturalNote:
      'Zero-grade disruption preserves the natural coastal cliff vegetation and frames unobstructed 270° panoramic horizon views.',
    photorealisticImage:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2400&q=90',
    secondaryImage:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Site Footprint', value: '4.85 Oceanfront Acres' },
      { label: 'Elevation Variance', value: '+28m Above Sea Level' },
      { label: 'Solar Azimuth', value: 'South-Southwest 218°' },
      { label: 'Preserved Coastline', value: '180m Clifftop Ridge' },
    ],
    materials: ['Natural Coastal Meadow', 'Cliff Granite Bedrock', 'Optical Survey Stakes', 'Perimeter Guide Cables'],
  },
  {
    id: 2,
    stepNumber: '02',
    phase: 'Excavation & Substructure Raft',
    title: 'Deep Bedrock & Foundation',
    subtitle: 'Engineered For 100-Year Structural Stability',
    timeline: 'Month 03 · Deep Piling & Sub-Grade Earthworks',
    progressPercent: 28,
    description:
      'Excavation down to solid bedrock. Heavy reinforced concrete friction piles anchor into the coastal rock, joined by a monolithic 1,200mm post-tensioned foundation slab with high-tensile steel rebar cages.',
    architecturalNote:
      'Engineered retaining foundation forms the subterranean anchor for upcoming upper cantilevered wings and terrace pool.',
    photorealisticImage:
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=2400&q=90',
    secondaryImage:
      'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Concrete Volume', value: '3,800 m³ M60 Grade' },
      { label: 'High-Tensile Rebar', value: '540 Metric Tons' },
      { label: 'Foundation Depth', value: '18 Meters to Bedrock' },
      { label: 'Seismic Dampening', value: 'Zone IV Coastal Grade' },
    ],
    materials: ['M60 Self-Compacting Concrete', 'Fe-550D High-Tensile Steel', 'Bentonite Slurry', 'Reinforced Formwork'],
  },
  {
    id: 3,
    stepNumber: '03',
    phase: 'Skeletal Framing & Superstructure',
    title: 'Rising Concrete Monolith',
    subtitle: 'Dramatic Multi-Story Cantilevers & Open Spans',
    timeline: 'Month 07 · Vertical Columns & Floor Slabs',
    progressPercent: 48,
    description:
      'The multi-level architectural skeleton ascends. Monolithic reinforced concrete columns and post-tensioned floor slabs create expansive column-free double-height living volumes facing the sea.',
    architecturalNote:
      'Internal load-bearing walls are eliminated, creating complete structural freedom for uninterrupted glass spans.',
    photorealisticImage:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2400&q=90',
    secondaryImage:
      'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Ceiling Clearance', value: '4.2m Ground / 3.8m Upper' },
      { label: 'Cantilever Reach', value: '6.5m Over Terrace' },
      { label: 'Slab Thickness', value: '320mm Post-Tensioned' },
      { label: 'Structural Columns', value: 'Fair-Faced Concrete' },
    ],
    materials: ['Fair-Faced Concrete', 'High-Yield Tendons', 'Structural Steel Columns', 'Architectural Shuttering'],
  },
  {
    id: 4,
    stepNumber: '04',
    phase: 'Modernist Facade & Panoramic Glazing',
    title: 'Architectural Envelope',
    subtitle: 'Thermal Glazing & Integrated Cliff Landscaping',
    timeline: 'Month 12 · Facade Skin & Grounds Cultivation',
    progressPercent: 68,
    description:
      'Mineral plaster and architectural travertine coat the geometric facade. Floor-to-ceiling ultra-clear acoustic glazing is installed alongside sculpted Mediterranean cliffside gardens, agave planters, and stone walkways.',
    architecturalNote:
      'Triple-glazed low-iron solar control glass provides maximum acoustic tranquility against breaking ocean waves.',
    photorealisticImage:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=90',
    secondaryImage:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Glazing Performance', value: 'U-Value 0.82 W/m²K' },
      { label: 'Facade Finish', value: 'Mineral Stucco & Travertine' },
      { label: 'Terrace Gardens', value: 'Native Drought-Tolerant Flora' },
      { label: 'Acoustic Insulation', value: '48 dB Wave Attenuation' },
    ],
    materials: ['Low-Iron Solar Control Glass', 'Natural Stucco & Travertine', 'Dry-Stack Fieldstone', 'Native Coastal Flora'],
  },
  {
    id: 5,
    stepNumber: '05',
    phase: 'Wood Louvers & Sunset Harmony',
    title: 'Artisanal Timber & Louvers',
    subtitle: 'Smoked Oak Cladding & Cantilever Balconies',
    timeline: 'Month 15 · Exterior Millwork & Glass Railings',
    progressPercent: 82,
    description:
      'Fluted smoked wood panels and motorized sun louvers are installed along the upper level. Minimalist glass balustrades frame panoramic clifftop ocean sunsets while providing aerodynamic wind deflection.',
    architecturalNote:
      'Thermally modified Japanese Yakisugi timber and smoked European oak provide durable coastal weather resistance.',
    photorealisticImage:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=90',
    secondaryImage:
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Timber Species', value: 'Smoked European Oak & Teak' },
      { label: 'Balcony Glass', value: '21.5mm Laminated Structural Glass' },
      { label: 'Solar Shading', value: 'Motorized Vertical Bronze Louvers' },
      { label: 'Weather Seal', value: 'Marine-Grade Nano Hydrophobic' },
    ],
    materials: ['Smoked Oak Louvers', 'Extruded Bronze Trims', 'Structural Glass Balustrades', 'Marine Stainless Steel 316'],
  },
  {
    id: 6,
    stepNumber: '06',
    phase: 'Illuminated Infinity Pool & Twilight Edge',
    title: 'The Heated Water Mirror',
    subtitle: 'Turquoise Basin, Sun Terrace & 2700K Night Glow',
    timeline: 'Month 17 · Water Features & Outdoor Living',
    progressPercent: 92,
    description:
      'The 20-meter clifftop infinity swimming pool is filled and heated. Submersible LED fiber-optics illuminate the turquoise water, reflecting the dusk sky across sun lounger daybeds and stone terrace plazas.',
    architecturalNote:
      'Concealed negative-edge perimeter overflow creates an optical illusion of water flowing directly into the horizon ocean.',
    photorealisticImage:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90',
    secondaryImage:
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Infinity Basin Length', value: '20 Meters Heated' },
      { label: 'Water Filtration', value: 'Ozone & UV Mineral System' },
      { label: 'Evening Lighting', value: '2700K Architectural Coves' },
      { label: 'Pool Deck Area', value: '2,400 Sq.Ft. Natural Stone' },
    ],
    materials: ['Volcanic Sukabumi Stone', 'Travertine Pavers', 'Fiber-Optic LEDs', 'Custom Sun Daybeds'],
  },
  {
    id: 7,
    stepNumber: '07',
    phase: 'Turnkey Living & Ocean Salon',
    title: 'Sanctuary of Living Art',
    subtitle: 'Motorized Glass Reveal, Fireplace & Bespoke Interior',
    timeline: 'Month 18 · Turnkey Handover & Habitation',
    progressPercent: 100,
    description:
      'Motorized floor-to-ceiling glass pocket doors glide seamlessly into hidden wall cavities, merging the Great Living Salon with the sea. Custom Minotti lounge seating, floating marble fireplace, and recessed cove illumination welcome the patron home.',
    architecturalNote:
      'Zero-threshold recessed floor tracks create a 100% flush, seamless boundary between indoor oak parquet and outdoor terrace stone.',
    photorealisticImage:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90',
    secondaryImage:
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Interior Living Area', value: '12,400 Sq.Ft. Habitable' },
      { label: 'Glass Door Span', value: '12m Motorized Pocket Glide' },
      { label: 'Joinery Materiality', value: 'Smoked Oak & Calacatta Viola' },
      { label: 'Atmosphere Purity', value: 'HEPA MERV-16 Climate Vault' },
    ],
    materials: ['Calacatta Viola Marble', 'Smoked Oak Parquet', 'Minotti Belgian Linen', 'Linear Bioethanol Hearth'],
  },
];
