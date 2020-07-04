import {Endpoint} from "./Endpoint.js";

export class HomeVideoEndpoint extends Endpoint {
    static url() {
        return 'videos/top'
    }

    method() {
        return 'GET'
    }

    contentType() {
        return 'application/json';
    }
}