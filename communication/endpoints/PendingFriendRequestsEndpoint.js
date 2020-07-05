import {Endpoint} from "./Endpoint.js";
import { store } from "../../reducers/appReducer";

export class PendingFriendRequestsEndpoint extends Endpoint {
    static url() {
        return 'user/friend_requests?email=' + store.getState().appReducer.userEmail
    }

    method() {
        return 'GET'
    }

    contentType() {
        return 'application/json';
    }
}