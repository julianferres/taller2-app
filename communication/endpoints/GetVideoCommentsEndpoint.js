import {Endpoint} from "./Endpoint.js";

export class GetVideoCommentsEndpoint extends Endpoint {
    static url() {
        return 'videos/comments'
    }

    method() {
        return 'GET'
    }

    contentType() {
        return 'application/json';
    }
}