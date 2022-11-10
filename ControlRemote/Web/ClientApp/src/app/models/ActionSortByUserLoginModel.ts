import { ActionSortByDateTimeModel } from "./ActionSortByDateTimeModel";

export class ActionSortByUserLoginModel {
    userLogin: string;
    station: string;
    commands: ActionSortByDateTimeModel[];

    public constructor(_userLogin: string, _station: string, _commands: ActionSortByDateTimeModel[]) {
        this.userLogin = _userLogin;
        this.station = _station;
        this.commands = _commands;
    }
}