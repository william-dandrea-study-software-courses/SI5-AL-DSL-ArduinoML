import {Command} from "../../utils/command.class";


export interface OutputBrickInterface {
    toUp(): Command;
    toDown(): Command | null;
}
