import {Endpoint} from "./Endpoint.js";

export class GiveReactionEndpoint extends Endpoint {
    static url() {
        return 'videos/reaction'
    }

    method() {
        return 'POST'
    }

    contentType() {
        return 'application/json';
    }
}