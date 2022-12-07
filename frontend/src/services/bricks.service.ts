import {Brick} from "typescript-arduinoml";
import {BehaviorSubject} from "rxjs";


export class BricksService {
    public static currentBricks: Brick[] = [];
    public static currentBricks$: BehaviorSubject<Brick[]> = new BehaviorSubject<Brick[]>([]);


    public static addNewBrick(brick: Brick) {
        BricksService.currentBricks.push(brick);
        BricksService.currentBricks$.next(BricksService.currentBricks);
    }

}
