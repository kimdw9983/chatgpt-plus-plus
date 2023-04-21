import esbuild from "esbuild"
import copyStatic from "esbuild-copy-files-plugin"

import { argv } from 'process'
import { join } from 'path'
import archiver from "archiver"
import fs from 'fs-extra'

const isDev = argv.includes('dev')
const buildDir = "build"
const releaseDir = "release"
const version = fs.readJsonSync('public/manifest.json').version

async function createZip() {
  async function archive() {
    const filename = `${releaseDir}/chatgptplusplus-${version}.zip`
    const output = fs.createWriteStream(filename)
    const archive = archiver('zip')

    const promise = new Promise((resolve, reject) => {
      output.on('close', () => resolve())
      output.on('end', () => resolve())
      archive.on('warning', (err) => {
        if (err.code === 'ENOENT') {
          console.warn(err)
        } else {
          reject(err)
        }
      })
      archive.on('error', (err) => reject(err))
    })
    
    archive.pipe(output)
    archive.directory(buildDir, false)
    archive.finalize()

    return promise
  }

  try {
    await archive()
    console.log('Zip file created successfully')
  } catch (err) {
    console.error('Error creating zip file:', err)
  }
}

async function buildProd() {
  await esbuild.build({
    entryPoints: [
      "src/scripts/main.tsx",
      "src/index.tsx",
    ],
    outdir: buildDir,
    bundle: true,
    minify: true,
    treeShaking: true,
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    jsxFactory: "h",
    jsxFragment: "Fragment",
    jsx: "automatic",
    plugins: [
      copyStatic({
        source: ["public/"],
        target: buildDir,
        copyWithFolder: false,
      }),
    ],
  })
}

async function buildDev() {
  await esbuild.build({
    entryPoints: [
      "src/scripts/main.tsx",
      "src/index.tsx",
    ],
    outdir: buildDir,
    bundle: true,
    minify: false,
    keepNames: true,
    treeShaking: false,
    define: {
      "process.env.NODE_ENV": '"development"',
    },
    jsxFactory: "h",
    jsxFragment: "Fragment",
    jsx: "automatic",
    plugins: [
      copyStatic({
        source: ["public/"],
        target: buildDir,
        copyWithFolder: false,
      }),
    ],
  })
}

async function main() {
  if (isDev) await buildDev()
  else await buildProd()

  if (argv.includes('--zip')) {
    await createZip()

    const dir = await fs.readdir(releaseDir)
    const zips = dir.filter(file => file.endsWith('.zip') && !file.includes(version))

    for (const file of zips) {
      const filePath = join(releaseDir, file)
      await fs.unlink(filePath)
    }
  }
}

main()