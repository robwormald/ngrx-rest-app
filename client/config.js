System.config({
  //use typescript for compilation
  //transpiler: 'typescript',
  //typescript compiler options
  typescriptOptions: {
    emitDecoratorMetadata: true
  },
  //map tells the System loader where to look for things
  map: {
    app: "./app",
    '@ngrx': 'https://npmcdn.com/@ngrx'
  },
  //packages defines our app package
  packages: {
    app: {
      main: './main.js',
      defaultExtension: 'js'
    }
  }
});
