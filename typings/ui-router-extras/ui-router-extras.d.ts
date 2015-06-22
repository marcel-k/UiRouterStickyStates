// Type definitions for ui-router-extras  (extending AngularJS ui-router)
// Project: https://github.com/christopherthielen/ui-router-extras
// Definitions by: Marcel van de Kamp <https://github.com/marcel-k>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../angular-ui-router/angular-ui-router.d.ts" />

declare module angular.ui.extras {
    
    /*
     * Extend the ui router $stateProvider with the sticky and deepStateRedirect props.
     */
    interface IExtraStateProvider extends ng.ui.IStateProvider {
        state(name: string, config: IStickyState): IExtraStateProvider;
        state(config: IStickyState): IExtraStateProvider;
        decorator(name?: string, decorator?: (state: IStickyState, parent: Function) => any): any;
    }

    interface IStickyStateProvider {
        /*
         * When debug is enabled, transitions are logged to the console in excessive detail.
         */
        enableDebug(enable: boolean): void;
    }

    interface IStickyState extends ng.ui.IState {
        /*
        * When marking a state sticky, the state must target its own unique named ui-view.
        * Docs: http://christopherthielen.github.io/ui-router-extras/#/sticky
        */
        sticky?: boolean;
        /*
         * The most-recently-activate substate of the DSR marked state is remembered.
         * When the DSR marked state is transitioned to directly, UI-Router Extras will instead redirect to the remembered state and parameters.
         * Docs: http://christopherthielen.github.io/ui-router-extras/#/dsr
         */
        deepStateRedirect?: boolean;
        /*
         * Function (injectable). Called when a sticky state is navigated away from (inactivated).
         */
        onInactivate?: Function;
        /*
         * Function (injectable). Called when an inactive sticky state is navigated to (reactivated).
         */
        onReactivate?: Function;
    }

    interface IPreviousState {
        /*
         * The previously active state
         */
        state: ng.ui.IState;
        /*
         * The params from the previously active state
         */
        params: ng.ui.IStateParamsService;
    }

    interface IPreviousStateService {
        /*
         * Get the previously active state.
         * Note: a state must have a url to be marked as previous state.
         * @param memoName The name of a  previously remembered state.
         */
        get(memoName?: string): IPreviousState;
        /*
         * The previous state is transitioned to. Transitions use $state.go(fromState, fromParams);
         * @param memoName The state memorized as 'memoName' is transitioned to.
         */
        go(memoName?: string): void;
        /*
         * Remember the previous state using a memoName.
         * @param memoName The previous state is memorized with a memoName
         */
        memo(memoName: string): void;
        /*
         * Forget a memorized state.
         * @param memoName state to forget.
         */
        forget(memoName?: string): void;
    }
}