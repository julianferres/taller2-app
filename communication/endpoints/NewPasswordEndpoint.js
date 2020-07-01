import {Endpoint} from "./Endpoint.js";

export class NewPasswordEndpoint extends Endpoint {
    static url() {
        return '/user/new_password'
    }

    method() {
        return 'POST'
    }

    contentType() {
        return 'application/json';
    }
}