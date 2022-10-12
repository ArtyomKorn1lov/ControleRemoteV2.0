import { Byte } from "@angular/compiler/src/util";

export class ActionPointAtTimeModel {
    flagImg: Byte;
    enableAction: boolean;

    public constructor(_flagImg: Byte, _enableAction: boolean) {
        this.flagImg = _flagImg;
        this.enableAction = _enableAction;
    }
}