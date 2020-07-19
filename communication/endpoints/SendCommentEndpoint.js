import {Endpoint} from "./Endpoint.js";

export class SendCommentEndpoint extends Endpoint {
    static url() {
        return 'videos/comment'
    }

    method() {
        return 'POST'
    }

    contentType() {
        return 'application/json';
    }
}