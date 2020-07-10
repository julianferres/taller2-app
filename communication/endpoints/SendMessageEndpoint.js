import {Endpoint} from "./Endpoint.js";

export class SendMessageEndpoint extends Endpoint {
    static url() {
        return 'user/message'
    }

    method() {
        return 'POST'
    }

    contentType() {
        return 'application/json';
    }
}