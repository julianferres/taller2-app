import {LoginEndpoint} from "../endpoints/LoginEndpoint";
import {ForgotPasswordEndpoint} from "../endpoints/ForgotPasswordEndpoint";
import {NewPasswordEndpoint} from "../endpoints/NewPasswordEndpoint";


class ApiClient {
    constructor(requester) {
        this._requester = requester;
    }

    login(data, onResponse) {
        return this._requester.call({
            endpoint: new LoginEndpoint(),
            onResponse: response => onResponse(response),
            data: data
        });
    }
    forgotPassword(data, onResponse) {
        return this._requester.call({
            endpoint: new ForgotPasswordEndpoint(),
            onResponse: response => onResponse(response),
            data: data
        });
    }
    newPassword(data, onResponse) {
        return this._requester.call({
            endpoint: new NewPasswordEndpoint(),
            onResponse: response => onResponse(response),
            data: data
        });
    }
}

export default ApiClient;