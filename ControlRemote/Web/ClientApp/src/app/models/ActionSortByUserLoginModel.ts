import { ActionSortByDateTimeModel } from "./ActionSortByDateTimeModel";

export class ActionSortByUserLoginModel {
    userLogin: string;
    commands: ActionSortByDateTimeModel[];

    public constructor(_userLogin: string, _commands: ActionSortByDateTimeModel[]) {
        this.userLogin = _userLogin;
        this.commands = _commands;
    }
}