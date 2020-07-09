import {Endpoint} from "./Endpoint.js";

export class ConversationEndpoint extends Endpoint {
    static url() {
        return '/user/messages_with'
    }

    method() {
        return 'GET'
    }

    contentType() {
        return 'application/json';
    }
}