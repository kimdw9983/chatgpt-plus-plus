import esbuild from "esbuild"
import copyStatic from "esbuild-copy-files-plugin"

const buildDir = '../cpp-dev'
const minify = true

async function runEsbuild() {
  await esbuild.build({
    entryPoints: [
      "src/scripts/main.tsx",
      "src/index.tsx",
    ],
    outdir: buildDir,
    bundle: true,
    minify,
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

function build() {
  runEsbuild()
}

build()