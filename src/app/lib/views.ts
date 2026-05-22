import { db } from './db'

/**
 * Devuelve las visualizaciones para un conjunto de slugs en una sola consulta a MongoDB.
 * Si la conexión falla, devuelve un objeto vacío para que la UI siga funcionando (mostrando 0).
 */
export async function getViewsForSlugs(slugs: string[]): Promise<Record<string, number>> {
	if (!slugs.length) return {}

	try {
		const database = await db()
		const docs = await database
			.collection('blog_stats')
			.find({ slug: { $in: slugs } }, { projection: { _id: 0, slug: 1, views: 1 } })
			.toArray()

		return docs.reduce<Record<string, number>>((acc, doc) => {
			if (typeof doc.slug === 'string') {
				acc[doc.slug] = typeof doc.views === 'number' ? doc.views : 0
			}
			return acc
		}, {})
	} catch (error) {
		console.error('[getViewsForSlugs] fallback:', error)
		return {}
	}
}
