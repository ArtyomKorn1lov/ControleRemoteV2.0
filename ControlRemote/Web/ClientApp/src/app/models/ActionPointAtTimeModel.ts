export class ActionPointAtTimeModel {
    flagImg: number;
    enableAction: boolean;
    imagePath: string;

    public constructor(_flagImg: number, _enableAction: boolean, _imagePath: string) {
        this.flagImg = _flagImg;
        this.enableAction = _enableAction;
        this.imagePath = _imagePath;
    }
}