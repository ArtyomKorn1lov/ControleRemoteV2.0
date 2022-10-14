export class ActionPointAtTimeModel {
    flagImg: number;
    enableAction: boolean;

    public constructor(_flagImg: number, _enableAction: boolean) {
        this.flagImg = _flagImg;
        this.enableAction = _enableAction;
    }
}