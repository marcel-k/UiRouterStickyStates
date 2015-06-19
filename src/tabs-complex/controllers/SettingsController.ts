module Tabs.Complex {
    var settingsFired: number = 0;
    export class SettingsController {
        fired: number;

        $inject = [];
        constructor() {
            settingsFired++;

            this.fired = settingsFired;
        }
    }
}