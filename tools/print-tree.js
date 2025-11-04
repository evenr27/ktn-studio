/**
 * Generate a complete folder/file tree of the project,
 * excluding heavy or generated directories and config files.
 *
 * Output file: .ia_context/project-structure.txt
 *
 * Run with:
 *   pnpm tree:project
 */

import fs from 'fs'
import path from 'path'

// Folders and files to exclude
const EXCLUDE = new Set([
  'node_modules',
  '.nx',
  '.github',
  '.husky',
  '.vscode',
  '.next',
  '.swc',
  'dist',
  'out',
  'coverage',
  '.git',
  '.DS_Store',
  '.editorconfig',
])

const OUTPUT_DIR = '.ia_context'
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'project-structure.txt')

function printTree(dir, prefix = '') {
  let output = ''
  const entries = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => !EXCLUDE.has(e.name))
    .sort((a, b) => a.name.localeCompare(b.name))

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]
    const isLast = i === entries.length - 1
    const connector = isLast ? '└── ' : '├── '
    const nextPrefix = isLast ? '    ' : '│   '
    const fullPath = path.join(dir, entry.name)

    output += `${prefix}${connector}${entry.name}\n`

    if (entry.isDirectory()) {
      output += printTree(fullPath, prefix + nextPrefix)
    }
  }
  return output
}

function main() {
  const root = process.cwd()
  console.log('📁 Generating project structure...')
  const tree = root + '\n' + printTree(root)

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR)
    console.log(`📂 Created directory: ${OUTPUT_DIR}`)
  }

  fs.writeFileSync(OUTPUT_FILE, tree, 'utf-8')
  console.log(`✅ Project structure written to: ${OUTPUT_FILE}`)
}

main()
