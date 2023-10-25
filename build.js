const esbuild = require('esbuild');

esbuild
  .build({
    entryPoints: ['dist/app.js'],
    bundle: true,
    outfile: 'build/bundle.js',
    platform: 'node',
    minify: true,
    treeShaking: true,
  })
  .catch(() => process.exit(1));
