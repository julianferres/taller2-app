import {Endpoint} from "./Endpoint.js";

export class RemoveReactionEndpoint extends Endpoint {
    static url() {
        return 'videos/reaction'
    }

    method() {
        return 'DELETE'
    }

    contentType() {
        return 'application/json';
    }
}