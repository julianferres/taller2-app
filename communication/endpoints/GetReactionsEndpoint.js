import {Endpoint} from "./Endpoint.js";

export class GetReactionsEndpoint extends Endpoint {
    static url() {
        return 'videos/reaction'
    }

    method() {
        return 'GET'
    }

    contentType() {
        return 'application/json';
    }
}