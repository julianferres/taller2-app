import {Endpoint} from "./Endpoint.js";

export class SearchVideosEndpoint extends Endpoint {
    static url() {
        return '/videos/search'
    }

    method() {
        return 'GET'
    }

    contentType() {
        return 'application/json';
    }
}