import { NextResponse } from 'next/server'
import { db } from '@/app/lib/db'

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	try {
		const database = await db()
		const post = await database
			.collection('blog_stats')
			.findOne({ slug }, { projection: { _id: 0, slug: 1, views: 1 } })

		return NextResponse.json({ slug, views: post?.views ?? 0, tracked: true })
	} catch (error) {
		console.error('[views:GET] fallback:', error)
		return NextResponse.json({ slug, views: 0, tracked: false })
	}
}

export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	try {
		const database = await db()

		const result = await database.collection('blog_stats').findOneAndUpdate(
			{ slug },
			[
				{
					$set: {
						slug,
						views: {
							$add: [{ $convert: { input: '$views', to: 'int', onError: 0, onNull: 0 } }, 1],
						},
						updatedAt: '$$NOW',
						createdAt: { $ifNull: ['$createdAt', '$$NOW'] },
					},
				},
			],
			{ upsert: true, returnDocument: 'after', projection: { _id: 0, slug: 1, views: 1 } },
		)

		return NextResponse.json({ slug, views: result?.views ?? 1, tracked: true })
	} catch (error) {
		console.error('[views:POST] fallback:', error)
		return NextResponse.json({ slug, views: 0, tracked: false })
	}
}
