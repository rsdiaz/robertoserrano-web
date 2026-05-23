import { NextResponse } from 'next/server'
import { db } from '@/app/lib/db'

const MAX_LIKES_PER_USER = 10

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	try {
		const database = await db()
		const post = await database
			.collection('blog_stats')
			.findOne({ slug }, { projection: { _id: 0, slug: 1, likes: 1 } })

		return NextResponse.json({ slug, likes: post?.likes ?? 0, tracked: true })
	} catch (error) {
		console.error('[likes:GET] fallback:', error)
		return NextResponse.json({ slug, likes: 0, tracked: false })
	}
}

export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	let delta = 1
	try {
		const body = (await req.json().catch(() => ({}))) as { delta?: number }
		if (typeof body.delta === 'number' && Number.isFinite(body.delta)) {
			delta = Math.max(-MAX_LIKES_PER_USER, Math.min(MAX_LIKES_PER_USER, Math.trunc(body.delta)))
		}
	} catch {
		// noop
	}

	try {
		const database = await db()

		const result = await database.collection('blog_stats').findOneAndUpdate(
			{ slug },
			[
				{
					$set: {
						slug,
						likes: {
							$max: [
								0,
								{
									$add: [{ $convert: { input: '$likes', to: 'int', onError: 0, onNull: 0 } }, delta],
								},
							],
						},
						updatedAt: '$$NOW',
						createdAt: { $ifNull: ['$createdAt', '$$NOW'] },
					},
				},
			],
			{ upsert: true, returnDocument: 'after', projection: { _id: 0, slug: 1, likes: 1 } },
		)

		return NextResponse.json({ slug, likes: result?.likes ?? Math.max(0, delta), tracked: true })
	} catch (error) {
		console.error('[likes:POST] fallback:', error)
		return NextResponse.json({ slug, likes: 0, tracked: false })
	}
}
