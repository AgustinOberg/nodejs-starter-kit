const esbuild = require('esbuild');

esbuild
  .build({
    entryPoints: ['dist/app.js'], // Ruta al archivo de entrada de tu proyecto
    bundle: true, // Crea un único archivo de salida
    outfile: 'build/bundle.js', // Ruta al archivo de salida,
    platform: 'node', // Indica que estás construyendo para Node.js
    minify: true, // Habilitar la minificación
    treeShaking: true, // Habilitar el tree shaking

  })
  .catch(() => process.exit(1));
