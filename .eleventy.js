module.exports = (function (eleventyConfig) {
    const CleanCSS = require("clean-css");
    eleventyConfig.addFilter("cssmin", function (code) {
        return new CleanCSS({}).minify(code).styles;
    });

    const UglifyJS = require("uglify-js");
    eleventyConfig.addFilter("jsmin", function (code) {
        let minified = UglifyJS.minify(code);
        if (minified.error) {
            console.log("UglifyJS error: ", minified.error);
            return code;
        }

        return minified.code;
    });
});