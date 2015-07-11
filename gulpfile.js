var gulp = require('gulp'),
    inject = require('gulp-inject'),
    tsc = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    argv = require('yargs').argv,
    gulpif = require('gulp-if'),
    merge2 = require('merge2'),
    del = require('del'),
    webserver = require('gulp-webserver')
    Config = require('./gulpfile.config');

var config = new Config();

/**
 * Generates the app.d.ts references file dynamically from all application *.ts files.
 */
gulp.task('gen-ts-refs', function () {

    return merge2(
        genTsRefs(config.typeScriptReferencesSimple, config.sourceSimple),
        genTsRefs(config.typeScriptReferencesComplex, config.sourceComplex)
        );
});

/**
 * Generate the dts files for the typescript files
 */
function genTsRefs(target, sources) {
    var target = gulp.src(target);
    var sources = gulp.src([sources], { read: false });

    return target.pipe(inject(sources, {
        starttag: '//{',
        endtag: '//}',
        transform: function (filepath) {
            return '/// <reference path="..' + filepath + '" />';
        }
    })).pipe(gulp.dest(config.typings));
}

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', ['gen-ts-refs'], function () {
    return merge2(
        compileTs(config.sourceSimple, config.typeScriptReferencesSimple, config.tsOutputPathSimple),
        compileTs(config.sourceComplex, config.typeScriptReferencesComplex, config.tsOutputPathComplex)
        );
});

function compileTs(tsPath, dtsPath, outputPath) {
    var sourceTsFiles = [tsPath,                                //path to typescript files
                        config.libraryTypeScriptDefinitions,    //reference to library .d.ts files
                        dtsPath];                               //reference to simple/complex.d.ts files

    var tsResult = gulp.src(sourceTsFiles)
                     .pipe(sourcemaps.init())
                     .pipe(tsc({
                         target: 'ES5',
                         declarationFiles: false,
                         noExternalResolve: true
                     }));

    tsResult.dts.pipe(gulp.dest(outputPath));

    return tsResult.js
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest(outputPath));
}

gulp.task('serve', ['compile-ts'], function () {
    gulp.src('')
    .pipe(webserver({
        open: '/index-tabs-simple.html'
    }));
});

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean', function (cb) {
    var typeScriptGenFiles = [config.source + '**/*.js',    // path to all JS files auto gen'd by editor
                              config.source + '**/*.js.map' // path to all sourcemap files auto gen'd by editor
    ];

    // delete the files
    del(typeScriptGenFiles, cb);
});

gulp.task('default', ['gen-ts-refs', 'compile-ts', 'serve']);