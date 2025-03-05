// esbuild.js
async function main() {
  const ctx = await context({
    entryPoints: ["src/extension.ts"],
    bundle: true,
    format: "cjs",
    minify: production,
    sourcemap: !production,
    sourcesContent: false,
    platform: "node",
    outfile: path.resolve(__dirname, "dist/extension.js"),
    external: ["vscode"],
    logLevel: "info",
    plugins: [esbuildProblemMatcherPlugin],
    define: {
      "process.env.NODE_ENV": JSON.stringify(production ? "production" : "development"),
      "__dirname": JSON.stringify(__dirname), // Shim Node globals
      "__filename": JSON.stringify(__filename),
    },
  });
  // ...
}