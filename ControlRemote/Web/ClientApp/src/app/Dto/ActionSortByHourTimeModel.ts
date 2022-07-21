import { ActionPointAtTimeModel } from "./ActionPointAtTimeModel";

export class ActionSortByHourTimeModel {
    hourTimeAction: Date;
    commands: ActionPointAtTimeModel[];

    public constructor(_hourTimeAction: Date, _commands: ActionPointAtTimeModel[]){
        this.hourTimeAction = _hourTimeAction;
        this.commands = _commands;
    }
}