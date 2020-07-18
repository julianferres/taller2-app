import {Endpoint} from "./Endpoint.js";

export class LastConversationsEndpoint extends Endpoint {
    static url() {
        return 'user/last_conversations'
    }

    method() {
        return 'GET'
    }

    contentType() {
        return 'application/json';
    }
}