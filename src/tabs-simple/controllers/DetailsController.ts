  module Tabs.Simple {
    var detailsFired: number = 0;
    export class DetailsController {
        params: any;
        fired: number;

        $inject = ['$stateParams'];
        constructor($stateParams: ng.ui.IStateParamsService, $state) {
            this.params = $stateParams;
            detailsFired++;

            this.fired = detailsFired;
        }
    }
 }