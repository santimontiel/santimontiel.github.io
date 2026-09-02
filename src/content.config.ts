import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

// Shared sub-schemas reused across collections so a "person" and a "link
// to elsewhere" always look the same, regardless of which collection
// they show up in.
const authorSchema = z.object({
	name: z.string(),
	url: z.url().optional(),
});

const linksSchema = z
	.object({
		paper: z.url().optional(),
		code: z.url().optional(),
		weights: z.url().optional(),
		video: z.url().optional(),
		demo: z.url().optional(),
		poster: z.url().optional(),
		slides: z.url().optional(),
	})
	.optional();

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
			tags: z.array(z.string()).default([]),
			draft: z.boolean().default(false),
		}),
});

const projectCollection = defineCollection({
	// Load Markdown and MDX files in the `src/content/projects/` directory.
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),

			// Authors, each optionally pointing at their personal/scholar page
			// and (via a 1-based index into `affiliations` below) which
			// institution superscript they should render.
			authors: z.array(authorSchema.extend({ affiliation: z.number().int().optional() })),
			affiliations: z
				.array(
					z.object({
						name: z.string(),
						logo: image(),
						url: z.url().optional(),
					}),
				)
				.default([]),

			links: linksSchema,
			announcement: z.string().optional(),
			draft: z.boolean().default(false),
		}),
});

const publicationCollection = defineCollection({
	loader: glob({
		base: './src/content/publications',
		pattern: '**/*.{md,mdx}',
	}),
	schema: ({ image }) =>
		z.object({
			// Metadata fields for publications.
			title: z.string(),
			authors: z.array(authorSchema),
			venue: z.string(),
			year: z.number().int().min(1900).max(new Date().getFullYear()),

			// Classification of the publication type.
			type: z.enum(['journal', 'conference', 'workshop', 'preprint', 'other']),

			// Extra optional fields.
			heroImage: image().optional(),
			links: linksSchema,
			location: z.string().optional(),
			draft: z.boolean().default(false),
		}),
});

const talksCollection = defineCollection({
	loader: glob({ base: './src/content/talks', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			// One-line blurb about the talk (not co-authors — talks are
			// usually solo, unlike papers).
			description: z.string().optional(),
			venue: z.string(),
			location: z.string().optional(),
			pubDate: z.coerce.date(),
			heroImage: image().optional(),
			link: z.url().optional(),
			draft: z.boolean().default(false),
		}),
});

const newsCollection = defineCollection({
	// News items are one-liners, not documents, so they're kept as a plain
	// JSON array rather than individual markdown files.
	loader: file('src/data/news.json'),
	schema: z.object({
		id: z.string(),
		date: z.coerce.date(),
		text: z.string(),
		link: z.url().optional(),
	}),
});

export const collections = {
	blog: blogCollection,
	projects: projectCollection,
	publications: publicationCollection,
	talks: talksCollection,
	news: newsCollection,
};
