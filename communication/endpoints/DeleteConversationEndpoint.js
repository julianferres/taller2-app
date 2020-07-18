import {Endpoint} from "./Endpoint.js";

export class DeleteConversationEndpoint extends Endpoint {
    static url() {
        return 'user/messages_with'
    }

    method() {
        return 'DELETE'
    }

    contentType() {
        return 'application/json';
    }
}