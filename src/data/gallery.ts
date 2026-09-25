import type { ImageMetadata } from 'astro';

import santiPhoto from '../assets/santi_photo.jpg';
import ellisSsad from '../assets/ellis_ssad_gaussiancar.jpg';
import icraVienna from '../assets/icra2026_gaussiancar.jpg';

export interface GalleryPhoto {
	src: ImageMetadata;
	/** Empty string for the decorative photos behind the portrait. */
	alt: string;
	/** Shown beneath the photo. Optional. */
	caption?: string;
	/**
	 * CSS object-position, for when a centre crop cuts the subject badly.
	 * Defaults to centre.
	 */
	focus?: string;
}

/**
 * Hero photo strip. Rendered as one equal-width row, so three or four
 * entries reads best — more than that and each card gets too small to see.
 * Cards are 4:5, which is close enough to the sources that the centre crop
 * takes only a sliver off each.
 */
export const heroGallery: GalleryPhoto[] = [
	{
		src: santiPhoto,
		alt: 'Santi Montiel',
		caption: 'In Amsterdam during my internship at TU Delft 🇳🇱',
	},
	{
		src: ellisSsad,
		alt: 'Santi Montiel presenting the GaussianCaR poster at ELLIS SSAD, Barcelona',
		caption: 'Presenting GaussianCaR at ELLIS SSAD in Barcelona 🇪🇸',
	},
	{
		src: icraVienna,
		alt: 'Santi Montiel beside the GaussianCaR poster at ICRA 2026, Vienna',
		caption: 'Presenting GaussianCaR at ICRA 2026 in Vienna 🇦🇹',
	},
];
