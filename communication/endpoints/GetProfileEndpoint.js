import {Endpoint} from "./Endpoint.js";
import { store } from "../../reducers/appReducer";

export class GetProfileEndpoint extends Endpoint {
    static url() {
        return 'user?email=' + store.getState().appReducer.userEmail
    }

    method() {
        return 'GET'
    }

    contentType() {
        return 'application/json';
    }
}