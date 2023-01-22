export class ModelImageStatistic {
    hour: number;
    minute: number;
    index_hour: number;
    index_minute: number
    imagePath: string;

    public constructor(_hour: number, _minute: number, _index_hour: number, _index_minute: number, _imagePath: string) {
        this.hour = _hour;
        this.minute = _minute;
        this.index_hour = _index_hour;
        this.index_minute = _index_minute;
        this.imagePath = _imagePath;
    }
}