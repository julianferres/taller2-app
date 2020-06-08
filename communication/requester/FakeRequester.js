import {Requester} from "./Requester.js";
import fakeRequesterExpectedResponses from "../mocks/fakeRequesterExpectedResponses.js";

class FakeRequester extends Requester {
    constructor(expectedResponses) {
        super();
        this._expectedResponses = expectedResponses || fakeRequesterExpectedResponses();
    }

    call({endpoint, onResponse, data = undefined}) {
        const expectedResponse = this._expectedResponses[endpoint.constructor.name];
        onResponse(expectedResponse)
    }
}

export default FakeRequester;