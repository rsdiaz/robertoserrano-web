import { ComputedFields, defineDocumentType, makeSource } from 'contentlayer2/source-files'
import readingTime from 'reading-time'
import path from 'path'
// Remark packages
import remarkGfm from 'remark-gfm'
import remarkAlert from 'remark-github-blockquote-alert'
import remarkMath from 'remark-math'
import {
	remarkExtractFrontmatter,
	remarkCodeTitles,
	remarkImgToJsx,
	extractTocHeadings,
} from 'pliny/mdx-plugins/index.js'
// Rehype packages
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeKatexNoTranslate from 'rehype-katex-notranslate'
import rehypeCitation from 'rehype-citation'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypePresetMinify from 'rehype-preset-minify'

const root = process.env.INIT_CWD ?? process.env.npm_config_local_prefix ?? process.cwd()

const computedFields: ComputedFields = {
	id: {
		type: 'string',
		resolve: doc => Buffer.from(doc.title).toString('base64'),
	},
}
export const BlogPost = defineDocumentType(() => ({
	name: 'BlogPost',
	filePathPattern: `blog-posts/**/*.mdx`,
	contentType: 'mdx',
	fields: {
		title: { type: 'string', required: true },
		date: { type: 'date', required: true },
		excerpt: { type: 'string', required: true },
		category: { type: 'string', required: false },
		tags: { type: 'list', of: { type: 'string' }, required: false },
		featured: { type: 'boolean', required: false },
		author: { type: 'string', required: false },
		image: { type: 'json', required: false },
	},
	computedFields: {
		...computedFields,
		readingTime: { type: 'json', resolve: doc => readingTime(doc.body.raw) },
		slug: {
			type: 'string',
			resolve: doc => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
		},
		toc: { type: 'json', resolve: doc => extractTocHeadings(doc.body.raw) },
	},
}))

export const Project = defineDocumentType(() => ({
	name: 'Project',
	filePathPattern: `projects/**/*.mdx`,
	contentType: 'mdx',
	fields: {
		title: { type: 'string', required: true },
		description: { type: 'string', required: true },
		tech: { type: 'list', of: { type: 'string' }, required: false },
		projectUrl: { type: 'string', required: false },
		repoUrl: { type: 'string', required: false },
		image: { type: 'string', required: false },
	},
}))

export default makeSource({
	contentDirPath: path.join(root, 'src/data'),
	documentTypes: [Project, BlogPost],
	mdx: {
		cwd: root,
		remarkPlugins: [remarkGfm, remarkMath, remarkAlert, remarkExtractFrontmatter, remarkCodeTitles, remarkImgToJsx],
		rehypePlugins: [
			rehypeSlug,
			[
				rehypeAutolinkHeadings,
				{
					behavior: 'prepend',
					headingProperties: {
						className: ['content-header'],
					},
				},
			],
			rehypeKatex,
			rehypeKatexNoTranslate,
			[rehypeCitation, { path: path.join(root, 'data') }],
			[rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
			rehypePresetMinify,
		],
	},
})
