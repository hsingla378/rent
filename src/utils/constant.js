export const properties = [
  {
    name: "Property 1",
    place: "New York",
    area: "Brooklyn",
    bedrooms: 3,
    bathrooms: 2,
    nearby: "School",
  },
  {
    name: "Property 2",
    place: "California",
    area: "Los Angeles",
    bedrooms: 2,
    bathrooms: 1,
    nearby: "Hospital",
  },
  {
    name: "Property 3",
    place: "Texas",
    area: "Houston",
    bedrooms: 4,
    bathrooms: 3,
    nearby: "Park",
  },
  {
    name: "Property 4",
    place: "Florida",
    area: "Miami",
    bedrooms: 1,
    bathrooms: 1,
    nearby: "Gym",
  },
  {
    name: "Property 5",
    place: "Washington",
    area: "Seattle",
    bedrooms: 2,
    bathrooms: 2,
    nearby: "Mall",
  },
];

export const columns = [
  {
    key: "name",
    title: "Name",
  },
  {
    key: "place",
    title: "Place",
  },
  {
    key: "area",
    title: "Area",
  },
  {
    key: "bedrooms",
    title: "Bedrooms",
  },
  {
    key: "bathrooms",
    title: "Bathrooms",
  },
  {
    key: "nearby",
    title: "Nearby",
  },
];

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
