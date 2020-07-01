import {Endpoint} from "./Endpoint.js";
import { store } from "../../reducers/appReducer";

export class UploadVideoEndpoint extends Endpoint {
    static url() {
        return 'user/video?email=' + store.getState().appReducer.userEmail
    }

    method() {
        return 'POST'
    }

    contentType() {
        return 'multipart/form-data';
    }
}