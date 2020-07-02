import { LoginEndpoint } from "../endpoints/LoginEndpoint";
import { ForgotPasswordEndpoint } from "../endpoints/ForgotPasswordEndpoint";
import { NewPasswordEndpoint } from "../endpoints/NewPasswordEndpoint";
import { SignUpEndpoint } from "../endpoints/SignUpEndpoint";
import { UploadVideoEndpoint } from "../endpoints/UploadVideoEndpoint";
import { HomeVideoEndpoint } from "../endpoints/HomeVideoEndpoint";
import { GetProfileEndpoint } from "../endpoints/GetProfileEndpoint";
import { EditProfileEndpoint } from "../endpoints/EditProfileEndpoint";

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
    signUp(data, onResponse) {
        return this._requester.call({
            endpoint: new SignUpEndpoint(),
            onResponse: response => onResponse(response),
            data: data
        })
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
    uploadVideo(data, onResponse) {
        return this._requester.call({
            endpoint: new UploadVideoEndpoint(),
            onResponse: response => onResponse(response),
            data: data,
            needsAuthorization: true
        })
    }
    homeVideos(onResponse){
        return this._requester.call({
            endpoint: new HomeVideoEndpoint(),
            onResponse: response => onResponse(response)
        })
    }
    getProfile(onResponse){
        return this._requester.call({
            endpoint: new GetProfileEndpoint(),
            onResponse: response => onResponse(response),
        })
    }
    editProfile(onResponse){
        return this._requester.call({
            endpoint: new EditProfileEndpoint(),
            onResponse: response => onResponse(response),
            data: data,
            needsAuthorization: true
        })
    }
}

export default ApiClient;