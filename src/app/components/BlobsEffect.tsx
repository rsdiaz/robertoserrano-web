export default function BlobsEffect() {
	return (
		<>
			<div
				className="blog-blob pointer-events-none absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl"
				aria-hidden="true"
			/>
			<div
				className="blog-blob-2 pointer-events-none absolute -top-12 right-0 h-[22rem] w-[22rem] rounded-full bg-primary/15 blur-3xl"
				aria-hidden="true"
			/>
		</>
	)
}
