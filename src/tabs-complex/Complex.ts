﻿module Tabs.Complex {
    var uiRouterDeps = ['ui.router',
        'ct.ui.router.extras.core',
        'ct.ui.router.extras.sticky',
        'ct.ui.router.extras.dsr'];

    var complex = angular.module('uiRouterExtrasExample.tabs.complex', uiRouterDeps);

    complex.run(['$rootScope', '$state', ($rootScope: any, $state: ng.ui.IStateService) => {
        $rootScope.$state = $state;
    }]);

    complex.config(['$stateProvider', '$urlRouterProvider', '$stickyStateProvider',
        ($stateProvider: ng.ui.extras.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $stickyStateProvider: ng.ui.extras.IStickyStateProvider) => {

        $stickyStateProvider.enableDebug(true);
        $urlRouterProvider.otherwise('/tabs/1/details');

        /*
         * Define a top abstract state with named views for the application
         */
        $stateProvider.state('app', {
            abstract: true,
            views: {
                'tabs': {},
                'content': {}
            }
        });

        /*
         * Define an abstract parent for the tabs.
         */
        $stateProvider.state('tabs', {
            parent: 'app',
            abstract: true,
            url: '/tabs',
            views: {
                'content@': {
                    templateUrl: 'src/tabs-complex/views/content.html',
                    controller: function () {//fired only once, no matter the active substate
                        this.random = 'random generated number in constructor:' + Math.floor((Math.random() * 10) + 1);
                    },
                    controllerAs: 'ctrl'
                },
                'tabs@': {
                    templateUrl: 'src/tabs-complex/views/tabs.html'
                }
            }
        });

        /*
         * create the individual tabs and make them sticky.
         * The id parameter must be added to the tabs states in stead of the parent, else the parent gets reloaded when the id changes.
         */
        $stateProvider.state('details', {
            sticky: true,
            parent: 'tabs',
            url: '/:id/details',
            views: {                
                'details@tabs': {
                    controller: 'detailsController',
                    controllerAs: 'ctrl',
                    templateUrl: 'src/tabs-complex/views/details.html'
                }
            }
        });

        $stateProvider.state('info', {
            sticky: true,
            parent: 'tabs',
            url: '/:id/info',
            views: {             
                'info@tabs': {
                    controller: 'infoController',
                    controllerAs: 'ctrl',
                    templateUrl: 'src/tabs-complex/views/info.html'
                }
            }
        });

        $stateProvider.state('settings', {
            sticky: true,
            parent: 'tabs',
            url: '/:id/settings',
            views: {               
                'settings@tabs': {
                    controller: 'settingsController',
                    controllerAs: 'ctrl',
                    templateUrl: 'src/tabs-complex/views/settings.html'
                }
            }
        });
    }]);

    complex.controller('detailsController', DetailsController);
    complex.controller('settingsController', SettingsController);
    complex.controller('infoController', InfoController);
}