// Type definitions for ui-router-extras  (extending AngularJS ui-router)
// Project: https://github.com/christopherthielen/ui-router-extras
// Definitions by: Marcel van de Kamp <https://github.com/marcel-k>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../angular-ui-router/angular-ui-router.d.ts" />

declare module angular.ui.extras {
    
    /*
     * Extend the ui router $stateProvider with the sticky and deepStateRedirect props.
     */
    interface IStateProvider extends ui.IStateProvider {
        state(name: string, config: IState): IStateProvider;
        state(config: IState): IStateProvider;
        decorator(name?: string, decorator?: (state: IState, parent: Function) => any): any;
    }

    interface IStickyStateProvider {
        /*
         * When debug is enabled, transitions are logged to the console in excessive detail.
         */
        enableDebug(enable: boolean): void;
    }

    /*
     * extend $state.go with IStateOptions
     */
    interface IStateService extends ui.IStateService {
         go(to: string, params?: {}, options?: IStateOptions): angular.IPromise<any>;
    }

    interface IState extends ui.IState {
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
        deepStateRedirect?: boolean | IDeepStateRedirectConfig;
        /*
         * Shortname deepStateRedirect prop
         */
        dsr?: boolean | IDeepStateRedirectConfig;
        /*
         * Function (injectable). Called when a sticky state is navigated away from (inactivated).
         */
        onInactivate?: Function;
        /*
         * Function (injectable). Called when an inactive sticky state is navigated to (reactivated).
         */
        onReactivate?: Function;
        /*
         * Note: named views are mandatory when using sticky states!
         */
        views?: {};
    }

    /*
     * Docs: http://christopherthielen.github.io/ui-router-extras/#/dsr
     */
    interface IDeepStateRedirectConfig {
        /*
         * If no deep state has been recorded, DSR will instead redirect to the default substate and params that you specify. 
         * If default is a string it is interpreted as the substate.
         */
        default?: string | IRedirectParams;
        /*
         * Specify params: true if your DSR state takes parameters.
         * If only a subset of the parameters should be included in the parameter grouping for recording deep states, 
         * specify an array of parameter names.
         */
        params?: boolean | string[];
        /*
         * A callback function that determines whether or not the redirect should actually occur, or changes the redirect to some other state.
        * Return an object: IRedirectParams to change the redirect
         */
        fn($dsr$: { redirect: IRedirectParams; to: IRedirectParams }): boolean | IRedirectParams;
    }

    interface IRedirectParams {
        state: string;
        params?: ui.IStateParamsService;
    }

    /*
     * $deepStateRedirect
     */
    interface IDeepStateRedirectService {
        /*
         * This method resets stored $deepStateRedirect data so following transitions will behave like there have no previous transitions been.
         * @param stateParams Can be passed in to select specific states to reset.
         */
        reset(stateName: string, stateParams?: { [key: string]: string | string[] }): void;
    }

    interface IStateOptions extends ui.IStateOptions {
        /*
         * shortcut to be used in $state.go to reset deepStateRedirect
         */
        ignoreDsr?: boolean;
    }

    /*
     * Docs: http://christopherthielen.github.io/ui-router-extras/#/previous
     */
    interface IPreviousState {
        /*
         * The previously active state
         */
        state: ui.IState;
        /*
         * The params from the previously active state
         */
        params: ui.IStateParamsService;
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
        go(memoName?: string): angular.IPromise<any>;
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