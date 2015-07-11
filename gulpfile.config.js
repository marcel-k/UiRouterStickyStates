'use strict';
var GulpConfig = (function () {
    function GulpConfig() {
        this.source = './src/';
        this.typings = './typings/';

        this.sourceSimple = this.source + 'tabs-simple/**/*.ts';
        this.tsOutputPathSimple = this.source + 'tabs-simple/';
        this.typeScriptReferencesSimple = this.tools + 'simple.d.ts';

        this.sourceComplex = this.source + 'tabs-complex/**/*.ts';
        this.tsOutputPathComplex = this.source + 'tabs-complex/';
        this.typeScriptReferencesComplex = this.tools + 'complex.d.ts';

        this.libraryTypeScriptDefinitions = './typings/**/*.d.ts';

    }
    return GulpConfig;
})();
module.exports = GulpConfig;



