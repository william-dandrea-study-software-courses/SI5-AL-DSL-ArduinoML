import {Brick} from "./bricks/brick.class";
import {StateModel} from "./states/state.class";


export class ApplicationModel {

    private readonly _bricks: Brick[];
    private readonly _states: StateModel[];
    private readonly _initialState: StateModel;


    constructor(bricks: Brick[], states: StateModel[], initialState: StateModel) {
        this._bricks = bricks;
        this._states = states;
        this._initialState = initialState;


        this._checkIfApplicationIsCorrect();
    }

    private _checkIfApplicationIsCorrect(): void {

        // Verify if we have differents pin for each brick
        const pinsBricksArray: number[] = this._bricks.map<number>(brick => brick.pin);
        const pinsBricksSet: Set<number> = new Set<number>(pinsBricksArray);
        if (pinsBricksSet.size != pinsBricksArray.length) {
            throw new Error("You cannot plug 2 bricks in the same pin")
        }

    }

    public export(): string {
        let result: string = ``;

        result += this._generateDeclaration();
        result += this._generateSetup();
        result += this._generateStates();
        result += this._generateLoop();

        return result;
    }


    private _generateDeclaration(): string {
        let result: string = `\n`;

        this._bricks.forEach(brick => {
            result += (brick.declare() + `\n`);
        })

        return result;
    }

    private _generateSetup(): string {
        let result: string = `\n`;

        result += `\nvoid setup() {`
        this._bricks.forEach(brick => {
            result += `\n\t${brick.setup()}`;
        });
        result += `\n}`

        return result;
    }

    private _generateStates(): string {
        let result: string = `\n`;


        this._states.forEach(state => {
            result += `\n${state.export()}`;
        })

        return result;
    }

    private _generateLoop(): string {
        let result: string = `\n`;

        result += `\nvoid loop() {`

        result += `\n\t${this._initialState.name}();`;

        result += `\n}`

        return result;
    }
}
