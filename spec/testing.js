const testsContext = require.context('./', true, /_[Ss]pec.tsx?$/);

testsContext.keys().forEach(function(path, i, testsContext) {
  try {
    console.log(path);
    testsContext(path);
  } catch(err) {
    console.error('[ERROR] WITH SPEC FILE: ', path);
    console.error(err);
  }
});
// // require all `project/src/components/**/index.js`
// const componentsContext = require.context('../src/', true, /\.tsx?$/);
//
// componentsContext.keys().forEach(function(path, i, testsContext) {
//   try {
//     testsContext(path);
//   } catch(err) {
//     console.error('[ERROR] WITH SPEC FILE: ', path);
//     console.error(err);
//   }
// });

//# sourceMappingURL=testing.js.map
