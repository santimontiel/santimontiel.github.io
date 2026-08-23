import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const [posts, projects, publications] = await Promise.all([
		getCollection('blog', ({ data }) => !data.draft),
		getCollection('projects', ({ data }) => !data.draft),
		getCollection('publications', ({ data }) => !data.draft),
	]);

	const postItems = posts.map((post) => ({
		title: post.data.title,
		description: post.data.description,
		pubDate: post.data.pubDate,
		link: `/blog/${post.id}/`,
	}));

	const projectItems = projects.map((project) => ({
		title: project.data.title,
		description: project.data.description,
		pubDate: project.data.pubDate,
		link: `/projects/${project.id}/`,
	}));

	const publicationItems = publications.map((pub) => ({
		title: pub.data.title,
		description: `${pub.data.venue} (${pub.data.year})`,
		pubDate: new Date(pub.data.year, 0, 1),
		// Pass a fully-qualified URL (not a bare `/path/#id`): @astrojs/rss's
		// canonicalization blindly appends a trailing slash to the end of
		// any relative link it's given, which corrupts a hash fragment
		// (`#car1` -> `#car1/`). An already-absolute URL skips that step.
		link: pub.data.links?.paper ?? new URL(`/publications/#${pub.id}`, context.site).href,
	}));

	const items = [...postItems, ...projectItems, ...publicationItems].sort(
		(a, b) => b.pubDate.valueOf() - a.pubDate.valueOf(),
	);

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items,
	});
}
