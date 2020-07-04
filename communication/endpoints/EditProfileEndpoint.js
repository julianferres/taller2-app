import {Endpoint} from "./Endpoint.js";
import { store } from "../../reducers/appReducer";

export class EditProfileEndpoint extends Endpoint {
    static url() {
        return 'user?email=' + store.getState().appReducer.userEmail
    }

    method() {
        return 'PUT'
    }

    contentType() {
        return 'multipart/form-data';
    }
}
