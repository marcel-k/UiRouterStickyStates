﻿module Tabs.Complex {
    var infoFired: number = 0;
    export class InfoController {
        fired: number;

        constructor() {
            
            infoFired++;

            this.fired = infoFired;
        }
    }
} 