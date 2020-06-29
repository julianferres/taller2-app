import {Endpoint} from "./Endpoint.js";

export class SignUpEndpoint extends Endpoint {
    static url() {
        return '/user/new_password'
    }

    method() {
        return 'POST'
    }

    contentType() {
        return 'multipart/form-data';
    }
}