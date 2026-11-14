import rawCatalog from '../data/catalog.json';

export type Sector = { slug: string; name: string; desc: string };
export type Governorate = {
  slug: string;
  name: string;
  zones: string[];
  desc: string;
};
export type Product = { name: string; desc: string; image: string };
export type Factory = {
  slug: string;
  name: string;
  initials: string;
  sector: string;
  governorate: string;
  zone: string;
  founded: number;
  employees: string;
  about: string;
  certifications: string[];
  exportCountries: string[];
  exportCapacity: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  image: string;
  products: Product[];
};

const catalog = rawCatalog as {
  sectors: Sector[];
  governorates: Governorate[];
  factories: Factory[];
};

export const sectors = catalog.sectors;
export const governorates = catalog.governorates;
export const factories = catalog.factories;

export const sectorBySlug = (slug: string) => sectors.find((item) => item.slug === slug);
export const governorateBySlug = (slug: string) => governorates.find((item) => item.slug === slug);
export const factoryBySlug = (slug: string) => factories.find((item) => item.slug === slug);
export const countFactories = (governorate: string) =>
  factories.filter((factory) => factory.governorate === governorate).length;

export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${path.replace(/^\/+/, '')}`;
}

export function normalizeSearch(value: string): string {
  return value
    .toLocaleLowerCase('ar')
    .normalize('NFD')
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .trim();
}
