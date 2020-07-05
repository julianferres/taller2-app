import {Endpoint} from "./Endpoint.js";
import { store } from "../../reducers/appReducer";

export class FriendsEndpoint extends Endpoint {
    static url() {
        return 'user/friends?email=' + store.getState().appReducer.userEmail
    }

    method() {
        return 'GET'
    }

    contentType() {
        return 'application/json';
    }
}