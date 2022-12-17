import {Component} from "./components/component.class";
import {State} from "./state/state.class";
import {ApplicationModel} from "../../model/application-model.class";


export class Application {

    private readonly components: Component[];
    private readonly states: State[];
    private readonly initialState: State;


    constructor(components: Component[], states: State[], initialState: State) {
        this.components = components;
        this.states = states;
        this.initialState = initialState;
    }

    public export(): string {
        const app: ApplicationModel = new ApplicationModel(this.components.map(c => c.getContent()), this.states.map(s => s.getContent()), this.initialState.getContent())
        return app.export();
    }
}
