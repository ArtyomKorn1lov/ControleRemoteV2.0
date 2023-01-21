import { ActionSortByDateTimeModel } from "./ActionSortByDateTimeModel";

export class ActionSortByUserLoginModel {
    userDomain: string;
    userLogin: string;
    name: string;
    station: string;
    commands: ActionSortByDateTimeModel[];

    public constructor(_userDomain: string, _userLogin: string, _name: string, _station: string, _commands: ActionSortByDateTimeModel[]) {
        this.userDomain = _userDomain;
        this.userLogin = _userLogin;
        this.name = _name;
        this.station = _station;
        this.commands = _commands;
    }
}