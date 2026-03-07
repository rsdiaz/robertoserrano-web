import { NextResponse } from 'next/server'
import { db } from '@/app/lib/db'

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const { slug } = await params
		const database = await db()

		const post = await database.collection('posts').find({ slug }).toArray()

		return NextResponse.json(post)
	} catch (error) {
		return NextResponse.json({ error: error instanceof Error ? error.message : 'Error interno' }, { status: 500 })
	}
}

export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const { slug } = await params
		const database = await db()

		await database.collection('posts').updateOne({ slug }, { $inc: { views: 1 } })

		return NextResponse.json({ ok: true })
	} catch (error) {
		return NextResponse.json({ error: error instanceof Error ? error.message : 'Error interno' }, { status: 500 })
	}
}
