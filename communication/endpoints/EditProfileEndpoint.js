import {Endpoint} from "./Endpoint.js";

export class EditProfileEndpoint extends Endpoint {
    static url() {
        return 'user'
    }

    method() {
        return 'PUT'
    }

    contentType() {
        return 'multipart/form-data';
    }
}
