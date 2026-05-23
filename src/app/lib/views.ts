import { db } from './db'

type StatDoc = { slug: string; views?: number; likes?: number }

/**
 * Devuelve las visualizaciones para un conjunto de slugs en una sola consulta a MongoDB.
 * Si la conexión falla, devuelve un objeto vacío para que la UI siga funcionando (mostrando 0).
 */
export async function getViewsForSlugs(slugs: string[]): Promise<Record<string, number>> {
	if (!slugs.length) return {}

	try {
		const database = await db()
		const docs = await database
			.collection<StatDoc>('blog_stats')
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

/**
 * Devuelve likes y views de un slug en una sola consulta.
 */
export async function getStatsForSlug(slug: string): Promise<{ views: number; likes: number }> {
	try {
		const database = await db()
		const doc = await database
			.collection<StatDoc>('blog_stats')
			.findOne({ slug }, { projection: { _id: 0, views: 1, likes: 1 } })
		return {
			views: typeof doc?.views === 'number' ? doc.views : 0,
			likes: typeof doc?.likes === 'number' ? doc.likes : 0,
		}
	} catch (error) {
		console.error('[getStatsForSlug] fallback:', error)
		return { views: 0, likes: 0 }
	}
}
