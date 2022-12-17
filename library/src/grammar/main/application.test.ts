import * as chai from "chai";
import {Button} from "./components/button.class";



const expect = chai.expect;

describe("TEST", () => {

    it("1", () => {

        // Je crée un bouton
        const button1: Button = new Button("button1", 13)
        const button2: Button = new Button("button1", 13)

        button2.isPressed()

    })
});
