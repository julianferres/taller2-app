import {Endpoint} from "./Endpoint.js";

export class LoginEndpoint extends Endpoint {
    static url() {
        return '/user/login'
    }

    method() {
        return 'POST'
    }

    needsAuthorization() {
        return false;
    }
}