module Tabs.Simple {
    var uiRouterDeps = ['ui.router',
        'ct.ui.router.extras.core',
        'ct.ui.router.extras.sticky',
        'ct.ui.router.extras.dsr'];

    var simple = angular.module('uiRouterExtrasExample.tabs.simple', uiRouterDeps);
    
    simple.config(['$stateProvider', '$urlRouterProvider', '$stickyStateProvider',
        ($stateProvider: ng.ui.extras.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $stickyStateProvider: ng.ui.extras.IStickyStateProvider) => {

        $urlRouterProvider.otherwise('/details');
        $stickyStateProvider.enableDebug(true);

        /*
         * Define an abstract parent for the tabs. It's controller wil only be fired once, no matter the active substate
         */
        $stateProvider.state('tabs', {
            abstract: true,
            templateUrl: 'src/tabs-simple/views/tabs.html',
            controller: function () {
                this.random = Math.floor((Math.random() * 10) + 1);
            },
            controllerAs: 'ctrl'
        });

        /*
         * create the individual tabs and make them sticky
         */
        $stateProvider.state('details', {
            sticky: true,
           deepStateRedirect: true,
            parent: 'tabs',
            url: '/details',
            views: {
                'details@tabs': {//sticky states MUST be coupled to named views
                    controller: 'detailsController',
                    controllerAs: 'ctrl',
                    templateUrl: 'src/tabs-simple/views/details.html'
                }
            },
            onInactivate: function(){},
            onReactivate: function(){}
        });

        $stateProvider.state('info', {
            sticky: true,
            parent: 'tabs',
            url: '/info',
            views: {
                'info@tabs': {//sticky states MUST be coupled to named views
                    controller: 'infoController',
                    controllerAs: 'ctrl',
                    templateUrl: 'src/tabs-simple/views/info.html'
                }
            }
        });

        $stateProvider.state('settings', {
            sticky: true,
            parent: 'tabs',
            url: '/settings',
            views: {
                'settings@tabs': {//sticky states MUST be coupled to named views
                    controller: 'settingsController',
                    controllerAs: 'ctrl',
                    templateUrl: 'src/tabs-simple/views/settings.html'
                }
            }
        });

        /*
         * Nested state inside a sticky (detailstab) state. 
         * Because the parent state is marked deepStateRedirect, 
         * this state wil be reactivated when parent state is transitioned to directly and this was the most recently active sub-state.
         */
        $stateProvider.state('details.nestedDetails', {
            url: '/nested',
            views: {
                'nestedDetails@details': {
                    template: '<h2>nested state and view of details</h2>'
                }
            }
        });
    }]);

    /*
     * Register the tab controllers
     */
    simple.controller('detailsController', DetailsController);
    simple.controller('settingsController', SettingsController);
    simple.controller('infoController', InfoController);
}