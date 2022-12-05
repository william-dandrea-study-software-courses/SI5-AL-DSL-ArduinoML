import {Condition} from "../../utils/condition.class";


export interface InputBrickInterface {
    isActive(): Condition;
    isInactive(): Condition;
}
