import RemoteRequester from "../communication/requester/RemoteRequester";
import ApiClient from "../communication/client/ApiClient";
import FakeRequester from "../communication/requester/FakeRequester";
import {ENV} from "../environment";

class App {
    constructor() {
        this._apiClient = undefined;
    }

    apiClient() {
        if (this._apiClient === undefined) {
            this._setUpApiClient();
        }

        return this._apiClient;
    }

    _setUpApiClient() {
        const requester = this._setUpRequester();
        this._apiClient = new ApiClient(requester);
    }

    _setUpRequester() {
        const usingFakeApi = ENV["usingFakeApi"];
        if (usingFakeApi) {
            return new FakeRequester();
        }

        const remoteApiUrl = ENV["apiUrl"];
        return new RemoteRequester(remoteApiUrl);
    }
}

export let app = new App();