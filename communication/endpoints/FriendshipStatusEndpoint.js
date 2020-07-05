import {Endpoint} from "./Endpoint.js";
import { store } from "../../reducers/appReducer";

export class FriendshipStatusEndpoint extends Endpoint {
    static url() {
        return 'user/friendship_status_with'
    }

    method() {
        return 'GET'
    }

    contentType() {
        return 'application/json';
    }
}