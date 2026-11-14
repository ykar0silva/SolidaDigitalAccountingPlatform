export type Person = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
};

export const socias: Person[] = [
  {
    slug: "socia-1",
    name: "Cleia Fernandes",
    role: "Sócia-fundadora",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    photo: "/images/team/placeholder.jpg",
  },
  {
    slug: "socia-2",
    name: "Núbia Fernandes",
    role: "Sócia-fundadora",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    photo: "/images/team/placeholder.jpg",
  },
];