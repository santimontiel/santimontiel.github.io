import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
		}),
});

const publicationCollection = defineCollection({
	loader: glob({
		base: './src/content/publications',
		pattern: '**/*.{md,mdx}'
	}),
	schema: ({ image }) => z.object({
		// Metadata fields for publications.
		title: z.string(),
		authors: z.array(z.string()),
		venue: z.string(),
		year: z.number().int().min(1900).max(new Date().getFullYear()),

		// Classification of the publication type.
		type: z.enum(['journal', 'conference', 'workshop', 'preprint', 'other']),
		
		// Extra optional fields.
		image: image(),
		url: z.string().url().optional(),
		doi: z.string().optional(),
		notes: z.string().optional(),
		location: z.string().optional(),
	}),
});

export const collections = {
	'blog': blogCollection,
	'publications': publicationCollection,
};