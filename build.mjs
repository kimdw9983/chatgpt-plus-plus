import esbuild from "esbuild"
import copyStatic from "esbuild-copy-files-plugin"

const buildDir = '../cpp-dev'

async function runBuild() {
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

async function runDevBuild() {
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
  // runBuild()
  runDevBuild()
}

build()