import {Endpoint} from "./Endpoint.js";

export class ForgotPasswordEndpoint extends Endpoint {
    static url() {
        return 'user/recover_password'
    }

    method() {
        return 'POST'
    }

    contentType() {
        return 'application/json';
    }
}