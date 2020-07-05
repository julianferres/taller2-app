import {Endpoint} from "./Endpoint.js";

export class AcceptFriendshipRequestEndpoint extends Endpoint {
    static url() {
        return '/user/friend_request/accept'
    }

    method() {
        return 'POST'
    }

    contentType() {
        return 'application/json';
    }
}