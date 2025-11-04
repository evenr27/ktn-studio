#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const CONTEXT_DIR = path.resolve(process.cwd(), '.context')
const MANIFEST_PATH = path.join(CONTEXT_DIR, 'manifest.json')

function loadManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error('[read-context] manifest.json not found in .context/')
    process.exit(1)
  }
  const raw = fs.readFileSync(MANIFEST_PATH, 'utf-8')
  return JSON.parse(raw)
}

function printNode(key, node, indent = '', filter) {
  const line = `${indent}- ${key} (${node.type}) → ${node.description}`
  const lowerFilter = filter ? filter.toLowerCase() : null
  const matches =
    !lowerFilter ||
    key.toLowerCase().includes(lowerFilter) ||
    node.type.toLowerCase().includes(lowerFilter) ||
    node.description.toLowerCase().includes(lowerFilter)

  if (matches) {
    console.log(line)
  }

  if (node.children) {
    const nextIndent = indent + '  '
    for (const [childKey, childNode] of Object.entries(node.children)) {
      printNode(childKey, childNode, nextIndent, filter)
    }
  }
}

function main() {
  const manifest = loadManifest()
  const filter = process.argv[2] // opcional (ej: "factory" o "architecture")

  console.log(`📁 Project: ${manifest.project}`)
  if (manifest.description) {
    console.log(`📝 ${manifest.description}`)
  }
  console.log('')

  const structure = manifest.structure || {}
  for (const [key, node] of Object.entries(structure)) {
    printNode(key, node, '', filter)
  }
}

main()
