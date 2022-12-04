

import * as mocha from 'mocha';
import * as chai from 'chai';
import {NamedElement} from "../../src";

const expect = chai.expect;
describe('My math library', () => {

    it('should be able to add things correctly' , () => {

        const namedElement: NamedElement = new NamedElement("Bonjour")
        expect(namedElement.name).to.equal("Bonjour");
    });

});
