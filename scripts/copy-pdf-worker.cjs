// Copy pdf.worker.min.js from pdfjs-dist into Next public directory
const fs = require('fs')
const path = require('path')

const root = process.cwd()
const outDir = path.join(root, 'public')

const workerCandidates = [
  path.join(root, 'node_modules', 'pdfjs-dist', 'build', 'pdf.worker.min.js'),
  path.join(root, 'node_modules', 'pdfjs-dist', 'build', 'pdf.worker.js'),
  path.join(root, 'node_modules', 'pdfjs-dist', 'build', 'pdf.worker.min.mjs'),
  path.join(root, 'node_modules', 'pdfjs-dist', 'build', 'pdf.worker.mjs'),
]

try {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
  const workerSrc = workerCandidates.find((p) => fs.existsSync(p))
  if (workerSrc) {
    const base = path.basename(workerSrc)
    const outPath = path.join(outDir, base)
    fs.copyFileSync(workerSrc, outPath)
    console.log(`Copied ${base} to /public`)
    if (base.endsWith('.mjs')) {
      const aliasPath = path.join(outDir, 'pdf.worker.min.js')
      fs.copyFileSync(workerSrc, aliasPath)
      console.log('Created alias pdf.worker.min.js from mjs source')
    }
  } else {
    console.error('No pdf.js worker file found in node_modules/pdfjs-dist/build')
    process.exitCode = 1
  }

  // Copy the main pdf.js library, prefer legacy UMD for a global export
  const libCandidatesLegacy = [
    path.join(root, 'node_modules', 'pdfjs-dist', 'legacy', 'build', 'pdf.min.js'),
    path.join(root, 'node_modules', 'pdfjs-dist', 'legacy', 'build', 'pdf.js'),
  ]
  const libCandidatesModern = [
    path.join(root, 'node_modules', 'pdfjs-dist', 'build', 'pdf.min.js'),
    path.join(root, 'node_modules', 'pdfjs-dist', 'build', 'pdf.js'),
    path.join(root, 'node_modules', 'pdfjs-dist', 'build', 'pdf.min.mjs'),
    path.join(root, 'node_modules', 'pdfjs-dist', 'build', 'pdf.mjs'),
  ]
  let libSrc = libCandidatesLegacy.find((p) => fs.existsSync(p))
  if (!libSrc) libSrc = libCandidatesModern.find((p) => fs.existsSync(p))
  if (libSrc) {
    const base = path.basename(libSrc)
    const isLegacy = libCandidatesLegacy.includes(libSrc)
    // Prefer consistent legacy filename in public
    const targetName = isLegacy ? (base.includes('.min.') ? 'pdf.legacy.min.js' : 'pdf.legacy.js') : base
    const outPath = path.join(outDir, targetName)
    fs.copyFileSync(libSrc, outPath)
    console.log(`Copied ${base} to /public as ${targetName}`)
    // Also create common alias for loaders that expect /pdf.min.js
    if (targetName.endsWith('.js')) {
      const aliasPath = path.join(outDir, 'pdf.min.js')
      fs.copyFileSync(outPath, aliasPath)
      console.log('Created alias pdf.min.js from copied library')
    }
  } else {
    console.error('No pdf.js library file found in node_modules/pdfjs-dist')
    process.exitCode = 1
  }
} catch (e) {
  console.error('Failed to copy pdf.worker.min.js:', e)
  process.exitCode = 1
}