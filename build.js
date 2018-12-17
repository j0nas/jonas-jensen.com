const { join } = require("path");
const { readFile, writeFile } = require("fs");
const { promisify } = require("util");
const { minify } = require("html-minifier");

(async () => {
  try {
    const readFilePromise = promisify(readFile);
    const writeFilePromise = promisify(writeFile);
    const indexHtmlPath = dev =>
      join(__dirname, "public", "index" + (dev ? ".dev" : "") + ".html");
    const encoding = "utf8";

    const indexHtml = await readFilePromise(indexHtmlPath(true), encoding);
    const minifiedIndexHtml = minify(indexHtml, {
      collapseWhitespace: true,
      minifyJS: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeTagWhitespace: true,
      sortAttributes: true,
      sortClassName: true,
      useShortDoctype: true,
      minifyCSS: true
    });
    await writeFilePromise(indexHtmlPath(), minifiedIndexHtml, encoding);
  } catch (e) {
    console.log("Error:", e.message);
  }
})();
