import {Endpoint} from "./Endpoint.js";
import { store } from "../../reducers/appReducer";

export class FriendshipRequestEndpoint extends Endpoint {
    static url() {
        return 'user/friend_request'
    }

    method() {
        return 'POST'
    }

    contentType() {
        return 'application/json';
    }
}