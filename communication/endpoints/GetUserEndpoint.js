import {Endpoint} from "./Endpoint.js";

export class GetUserEndpoint extends Endpoint {
    static url() {
        return 'user'
    }

    method() {
        return 'GET'
    }

    contentType() {
        return 'application/json';
    }
}