import {Endpoint} from "./Endpoint.js";

export class DeleteVideoEndpoint extends Endpoint {
    static url() {
        return 'user/video'
    }

    method() {
        return 'DELETE'
    }

    contentType() {
        return 'application/json';
    }
}