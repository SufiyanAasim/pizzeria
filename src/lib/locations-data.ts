export type Location = {
  slug: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
};

export const LOCATIONS: Location[] = [
  {
    slug: "downtown",
    name: "Downtown",
    address: "12 Foundry Row, Downtown",
    phone: "(555) 010-2200",
    hours: "Tue–Sun, 5pm till the dough runs out",
  },
  {
    slug: "harbor",
    name: "Harbor District",
    address: "88 Quayside Lane, Harbor District",
    phone: "(555) 010-8850",
    hours: "Wed–Mon, 5pm–11pm",
  },
];

export function locationBySlug(slug: string): Location | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}
