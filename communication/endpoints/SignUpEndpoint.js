import {Endpoint} from "./Endpoint.js";

export class SignUpEndpoint extends Endpoint {
    static url() {
        return 'user'
    }

    method() {
        return 'POST'
    }

    contentType() {
        return 'multipart/form-data';
    }
}
