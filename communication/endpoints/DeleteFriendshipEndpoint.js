import {Endpoint} from "./Endpoint.js";
import { store } from "../../reducers/appReducer";

export class DeleteFriendshipEndpoint extends Endpoint {
    static url() {
        return 'user/friend'
    }

    method() {
        return 'DELETE'
    }

    contentType() {
        return 'application/json';
    }
}