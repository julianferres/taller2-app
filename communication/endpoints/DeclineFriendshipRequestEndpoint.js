import {Endpoint} from "./Endpoint.js";

export class DeclineFriendshipRequestEndpoint extends Endpoint {
    static url() {
        return '/user/friend_request/reject'
    }

    method() {
        return 'POST'
    }

    contentType() {
        return 'application/json';
    }
}