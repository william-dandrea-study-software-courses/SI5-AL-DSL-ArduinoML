import {Command} from "../../commands/command.class";


export interface OutputBrickInterface {
    toUp(): Command;
    toDown(): Command | null;
}
