import { ActionSortByHourTimeModel } from "./ActionSortByHourTimeModel";

export class ActionSortByDateTimeModel {
    dateTimeAction: Date;
    commands: ActionSortByHourTimeModel[];

    public constructor(_dateTimeAction: Date, _commands: ActionSortByHourTimeModel[]) {
        this.dateTimeAction = _dateTimeAction;
        this.commands = _commands;
    }
}