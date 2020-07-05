import {Endpoint} from "./Endpoint.js";
import { store } from "../../reducers/appReducer";

export class UserVideosEndpoint extends Endpoint {
    static url() {
        return '/user/videos'
    }

    method() {
        return 'GET'
    }

    contentType() {
        return 'application/json';
    }
}