import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import os from 'os'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const config = path.join(root, 'contentlayer.config.ts')

execSync(`npx contentlayer2 build --config "${config}"`, { stdio: 'inherit', cwd: root })

// On Windows, contentlayer writes to ~/.contentlayer instead of project root.
// Copy the generated output to the expected project location.
const homeGenerated = path.join(os.homedir(), '.contentlayer', 'generated')
const projectGenerated = path.join(root, '.contentlayer', 'generated')

if (fs.existsSync(homeGenerated) && homeGenerated !== projectGenerated) {
	fs.cpSync(homeGenerated, projectGenerated, { recursive: true, force: true })
	console.log(`✅ Copiado .contentlayer/generated al proyecto`)
}
