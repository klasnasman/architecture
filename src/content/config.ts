import { defineCollection, z } from "astro:content";

const project = defineCollection({
  schema: ({ image }) =>
    z.object({
      project: z.string(),
      type: z.string().transform((value) => value.toLowerCase()),
      location: z.string(),
      country: z.string(),
      year: z.number(),
      photographer: z.string(),
      images: z.array(image()),
      thumb: image(),
    }),
});
const about = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      images: z.array(image()),
      thumb: image(),
    }),
});
const employees = defineCollection({
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      position: z.string(),
      email: z.string().email(),
      phone: z.string(),
      thumb: image(),
    }),
});
export const collections = {
  project: project,
  about: about,
  employees: employees,
};
