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
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/new-gen-patio-a95f1.firebasestorage.app/o/03.webp?alt=media&token=aa05b14f-631c-4ac9-a011-7182043970a8",
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
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/new-gen-patio-a95f1.firebasestorage.app/o/03.webp?alt=media&token=aa05b14f-631c-4ac9-a011-7182043970a8",
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
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/new-gen-patio-a95f1.firebasestorage.app/o/03.webp?alt=media&token=aa05b14f-631c-4ac9-a011-7182043970a8",
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
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/new-gen-patio-a95f1.firebasestorage.app/o/03.webp?alt=media&token=aa05b14f-631c-4ac9-a011-7182043970a8",
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
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/new-gen-patio-a95f1.firebasestorage.app/o/03.webp?alt=media&token=aa05b14f-631c-4ac9-a011-7182043970a8",
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
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/new-gen-patio-a95f1.firebasestorage.app/o/03.webp?alt=media&token=aa05b14f-631c-4ac9-a011-7182043970a8",
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
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/new-gen-patio-a95f1.firebasestorage.app/o/03.webp?alt=media&token=aa05b14f-631c-4ac9-a011-7182043970a8",
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
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/new-gen-patio-a95f1.firebasestorage.app/o/03.webp?alt=media&token=aa05b14f-631c-4ac9-a011-7182043970a8",
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
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/new-gen-patio-a95f1.firebasestorage.app/o/03.webp?alt=media&token=aa05b14f-631c-4ac9-a011-7182043970a8",
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
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/new-gen-patio-a95f1.firebasestorage.app/o/03.webp?alt=media&token=aa05b14f-631c-4ac9-a011-7182043970a8",
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
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/new-gen-patio-a95f1.firebasestorage.app/o/03.webp?alt=media&token=aa05b14f-631c-4ac9-a011-7182043970a8",
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
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/new-gen-patio-a95f1.firebasestorage.app/o/03.webp?alt=media&token=aa05b14f-631c-4ac9-a011-7182043970a8",
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
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/new-gen-patio-a95f1.firebasestorage.app/o/03.webp?alt=media&token=aa05b14f-631c-4ac9-a011-7182043970a8",
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
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/new-gen-patio-a95f1.firebasestorage.app/o/03.webp?alt=media&token=aa05b14f-631c-4ac9-a011-7182043970a8",
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
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/new-gen-patio-a95f1.firebasestorage.app/o/03.webp?alt=media&token=aa05b14f-631c-4ac9-a011-7182043970a8",
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
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/new-gen-patio-a95f1.firebasestorage.app/o/03.webp?alt=media&token=aa05b14f-631c-4ac9-a011-7182043970a8",
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
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/new-gen-patio-a95f1.firebasestorage.app/o/03.webp?alt=media&token=aa05b14f-631c-4ac9-a011-7182043970a8",
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
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/new-gen-patio-a95f1.firebasestorage.app/o/03.webp?alt=media&token=aa05b14f-631c-4ac9-a011-7182043970a8",
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
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/new-gen-patio-a95f1.firebasestorage.app/o/03.webp?alt=media&token=aa05b14f-631c-4ac9-a011-7182043970a8",
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
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/new-gen-patio-a95f1.firebasestorage.app/o/03.webp?alt=media&token=aa05b14f-631c-4ac9-a011-7182043970a8",
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
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/new-gen-patio-a95f1.firebasestorage.app/o/03.webp?alt=media&token=aa05b14f-631c-4ac9-a011-7182043970a8",
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
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/new-gen-patio-a95f1.firebasestorage.app/o/03.webp?alt=media&token=aa05b14f-631c-4ac9-a011-7182043970a8",
    stain: "Green",
    size: "14 x 14",
    rafterTail: "None",
    kneeBrace: "None",
    timberSize: "Heavy",
    foundation: "Turf"
  }
];
