export interface Project {
  id: string;
  title: string;
  imageUrl: string;

  // Campos generales
  projectType?: string;
  size?: string;
  structureColor?: string;
  colorsPanels?: string;
  more?: string;

  // Campos adicionales
  stain?: string;
  rafterTail?: string;
  kneeBrace?: string;
  timberSize?: string;

  // Campos para filtros
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
    size: "12 x 10",
    coveredPatios: "Attached Covered Patio"
  }
];
