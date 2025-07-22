export interface Project {
  id: string;
  title: string;
  imageUrl: string;
  stain: string;
  size: string;
  rafterTail: string;
  kneeBrace: string;
  timberSize: string;
  coveredPatios?: string;
  outdoorKitchen?: string;
  panels?: string;
  composite?: string;
  hybrid?: string;
  addons?: string;
  foundation?: string;
}

export const projects: Project[] = [
  // Covered Patios
  {
    id: "1",
    title: "Attached Covered Patio",
    imageUrl: "assets/images/placeholder/attached.jpg",
    stain: "Walnut",
    size: "12 x 10",
    rafterTail: "Standard",
    kneeBrace: "Standard",
    timberSize: "Heavy Beam",
    coveredPatios: "Attached Covered Patio"
  },
  {
    id: "2",
    title: "FreeStanding Pergola",
    imageUrl: "assets/images/placeholder/freestanding.jpg",
    stain: "Walnut",
    size: "12 x 10",
    rafterTail: "Standard",
    kneeBrace: "Standard",
    timberSize: "Heavy Beam",
    coveredPatios: "FreeStanding Pergola"
  },
  {
    id: "3",
    title: "Cantilevered Pergola",
    imageUrl: "assets/images/placeholder/cantilever.jpg",
    stain: "Walnut",
    size: "12 x 10",
    rafterTail: "Standard",
    kneeBrace: "Standard",
    timberSize: "Heavy Beam",
    coveredPatios: "Cantilevered Pergola"
  },

  // Outdoor Kitchen
  {
    id: "4",
    title: "Modern Outdoor Kitchen",
    imageUrl: "assets/images/placeholder/modern-kitchen.jpg",
    stain: "Black",
    size: "10 x 8",
    rafterTail: "None",
    kneeBrace: "Hidden",
    timberSize: "Standard",
    outdoorKitchen: "Modern Outdoor Kitchen"
  },
  {
    id: "5",
    title: "Traditional Outdoor Kitchen",
    imageUrl: "assets/images/placeholder/traditional-kitchen.jpg",
    stain: "Cherry",
    size: "10 x 8",
    rafterTail: "Traditional",
    kneeBrace: "Exposed",
    timberSize: "Standard",
    outdoorKitchen: "Traditional Outdoor Kitchen"
  },

  // Panels
  {
    id: "6",
    title: "Dark Bronze Panels",
    imageUrl: "assets/images/placeholder/bronze-panel.jpg",
    stain: "Bronze",
    size: "12 x 10",
    rafterTail: "Modern",
    kneeBrace: "Hidden",
    timberSize: "Slim",
    panels: "Dark Bronze"
  },
  {
    id: "7",
    title: "White Panels",
    imageUrl: "assets/images/placeholder/white-panel.jpg",
    stain: "White",
    size: "12 x 10",
    rafterTail: "Modern",
    kneeBrace: "Hidden",
    timberSize: "Slim",
    panels: "White"
  },
  {
    id: "8",
    title: "Wood Imitation Panels",
    imageUrl: "assets/images/placeholder/wood-panel.jpg",
    stain: "Oak",
    size: "12 x 10",
    rafterTail: "Rustic",
    kneeBrace: "Visible",
    timberSize: "Heavy Beam",
    panels: "Wood Imitation Panels"
  },

  // Composite
  {
    id: "9",
    title: "Black Composite",
    imageUrl: "assets/images/placeholder/black-composite.jpg",
    stain: "Black",
    size: "10 x 8",
    rafterTail: "None",
    kneeBrace: "Minimal",
    timberSize: "Light",
    composite: "Black"
  },
  {
    id: "10",
    title: "Wood Imitation Composite",
    imageUrl: "assets/images/placeholder/wood-composite.jpg",
    stain: "Wood",
    size: "10 x 8",
    rafterTail: "Rustic",
    kneeBrace: "Classic",
    timberSize: "Medium",
    composite: "Wood Imitation"
  },

  // Hybrid
  {
    id: "11",
    title: "Polycarbonate Hybrid",
    imageUrl: "assets/images/placeholder/polycarbonate.jpg",
    stain: "Clear",
    size: "12 x 12",
    rafterTail: "None",
    kneeBrace: "Hidden",
    timberSize: "Minimal",
    hybrid: "Polycarbonate"
  },
  {
    id: "12",
    title: "Naked Pergola Hybrid",
    imageUrl: "assets/images/placeholder/naked.jpg",
    stain: "Natural",
    size: "12 x 12",
    rafterTail: "None",
    kneeBrace: "None",
    timberSize: "Minimal",
    hybrid: "Naked Pergola"
  },

  // Add-ons
  {
    id: "13",
    title: "TV Wall Add-on",
    imageUrl: "assets/images/placeholder/tv-wall.jpg",
    stain: "Gray",
    size: "10 x 6",
    rafterTail: "Hidden",
    kneeBrace: "None",
    timberSize: "Slim",
    addons: "TV Walls"
  },
  {
    id: "14",
    title: "Privacy Wall Add-on",
    imageUrl: "assets/images/placeholder/privacy-wall.jpg",
    stain: "Dark",
    size: "10 x 6",
    rafterTail: "Hidden",
    kneeBrace: "None",
    timberSize: "Slim",
    addons: "Privacy Walls"
  },
  {
    id: "15",
    title: "Slags Add-on",
    imageUrl: "assets/images/placeholder/slags.jpg",
    stain: "Gray",
    size: "10 x 6",
    rafterTail: "None",
    kneeBrace: "None",
    timberSize: "Slim",
    addons: "Slags"
  },
  {
    id: "16",
    title: "Fire Pit Add-on",
    imageUrl: "assets/images/placeholder/firepit.jpg",
    stain: "Brick",
    size: "6 x 6",
    rafterTail: "None",
    kneeBrace: "None",
    timberSize: "None",
    addons: "Fire Pit"
  },

  // Foundation
  {
    id: "17",
    title: "Concrete Slab Foundation",
    imageUrl: "assets/images/placeholder/slab.jpg",
    stain: "Gray",
    size: "14 x 14",
    rafterTail: "None",
    kneeBrace: "None",
    timberSize: "Heavy",
    foundation: "Concrete Slab"
  },
  {
    id: "18",
    title: "Concrete Stamped Foundation",
    imageUrl: "assets/images/placeholder/stamped.jpg",
    stain: "Gray",
    size: "14 x 14",
    rafterTail: "None",
    kneeBrace: "None",
    timberSize: "Heavy",
    foundation: "Concrete Stamped"
  },
  {
    id: "19",
    title: "Spray Decking Foundation",
    imageUrl: "assets/images/placeholder/spray.jpg",
    stain: "Gray",
    size: "14 x 14",
    rafterTail: "None",
    kneeBrace: "None",
    timberSize: "Heavy",
    foundation: "Spray Decking"
  },
  {
    id: "20",
    title: "Paver Foundation",
    imageUrl: "assets/images/placeholder/paver.jpg",
    stain: "Gray",
    size: "14 x 14",
    rafterTail: "None",
    kneeBrace: "None",
    timberSize: "Heavy",
    foundation: "Paver"
  },
  {
    id: "21",
    title: "Tiles Foundation",
    imageUrl: "assets/images/placeholder/tiles.jpg",
    stain: "Gray",
    size: "14 x 14",
    rafterTail: "None",
    kneeBrace: "None",
    timberSize: "Heavy",
    foundation: "Tiles"
  },
  {
    id: "22",
    title: "Turf Foundation",
    imageUrl: "assets/images/placeholder/turf.jpg",
    stain: "Green",
    size: "14 x 14",
    rafterTail: "None",
    kneeBrace: "None",
    timberSize: "Heavy",
    foundation: "Turf"
  }
];
