import {LoginEndpoint} from "../endpoints/LoginEndpoint";
import {ForgotPasswordEndpoint} from "../endpoints/ForgotPasswordEndpoint";
import {NewPasswordEndpoint} from "../endpoints/NewPasswordEndpoint";
import {SignUpEndpoint} from "../endpoints/SignUpEndpoint";
import {UploadVideoEndpoint} from "../endpoints/UploadVideoEndpoint";
import {HomeVideoEndpoint} from "../endpoints/HomeVideoEndpoint";
import {GetProfileEndpoint} from "../endpoints/GetProfileEndpoint";
import {EditProfileEndpoint} from "../endpoints/EditProfileEndpoint";
import {FriendsEndpoint} from "../endpoints/FriendsEndpoint";
import {PendingFriendRequestsEndpoint} from "../endpoints/PendingFriendRequestsEndpoint"
import {UserVideosEndpoint} from "../endpoints/UserVideosEndpoint";
import {FriendshipStatusEndpoint} from "../endpoints/FriendshipStatusEndpoint";
import {FriendshipRequestEndpoint} from "../endpoints/FriendshipRequestEndpoint";
import {AcceptFriendshipRequestEndpoint} from "../endpoints/AcceptFriendshipRequestEndpoint"
import {DeclineFriendshipRequestEndpoint} from "../endpoints/DeclineFriendshipRequestEndpoint"
import { SearchVideosEndpoint } from "../endpoints/SearchVideosEndpoint"
import { DeleteFriendshipEndpoint } from "../endpoints/DeleteFriendshipEndpoint"
import {GiveReactionEndpoint} from "../endpoints/GiveReactionEndpoint";
import {RemoveReactionEndpoint} from "../endpoints/RemoveReactionEndpoint";
import {GetReactionsEndpoint} from "../endpoints/GetReactionsEndpoint";
import {ConversationEndpoint} from "../endpoints/ConversationEndpoint";
import {SendMessageEndpoint} from "../endpoints/SendMessageEndpoint";
import {GetUserEndpoint} from "../endpoints/GetUserEndpoint";




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

    homeVideos(onResponse) {
        return this._requester.call({
            endpoint: new HomeVideoEndpoint(),
            onResponse: response => onResponse(response)
        })
    }

    getProfile(onResponse) {
        return this._requester.call({
            endpoint: new GetProfileEndpoint(),
            onResponse: response => onResponse(response),
        })
    }

    editProfile(data, onResponse) {
        return this._requester.call({
            endpoint: new EditProfileEndpoint(),
            onResponse: response => onResponse(response),
            data: data,
            needsAuthorization: true
        })
    }

    getPendingFriendsRequests(onResponse) {
        return this._requester.call({
            endpoint: new PendingFriendRequestsEndpoint(),
            onResponse: response => onResponse(response),
            data: undefined,
            needsAuthorization: true
        })
    }

    getFriends(onResponse) {
        return this._requester.call({
            endpoint: new FriendsEndpoint(),
            onResponse: response => onResponse(response),
            data: undefined,
            needsAuthorization: true
        })
    }

    getUserVideos(data, onResponse) {
        return this._requester.call({
            endpoint: new UserVideosEndpoint(),
            onResponse: response => onResponse(response),
            data: data,
            needsAuthorization: true
        })
    }

    getFriendshipStatus(data, onResponse) {
        return this._requester.call({
            endpoint: new FriendshipStatusEndpoint(),
            onResponse: response => onResponse(response),
            data: data,
            needsAuthorization: true
        })
    }

    sendFriendshipRequest(data, onResponse) {
        return this._requester.call({
            endpoint: new FriendshipRequestEndpoint(),
            onResponse: response => onResponse(response),
            data: data,
            needsAuthorization: true
        })
    }

    acceptFriendshipRequest(data, onResponse) {
        return this._requester.call({
            endpoint: new AcceptFriendshipRequestEndpoint(),
            onResponse: response => onResponse(response),
            data: data,
            needsAuthorization: true
        })
    }

    declineFriendshipRequest(data, onResponse) {
        return this._requester.call({
            endpoint: new DeclineFriendshipRequestEndpoint(),
            onResponse: response => onResponse(response),
            data: data,
            needsAuthorization: true
        })
    }

    searchVideos(data, onResponse) {
        return this._requester.call({
            endpoint: new SearchVideosEndpoint(),
            onResponse: response => onResponse(response),
            data: data,
            needsAuthorization: true
        })
    }

    deleteFriend(data, onResponse) {
        return this._requester.call({
            endpoint: new DeleteFriendshipEndpoint(),
            onResponse: response => onResponse(response),
            data: data,
            needsAuthorization: true
        })
    }

    giveReaction(data, onResponse){
        return this._requester.call({
            endpoint: new GiveReactionEndpoint(),
            onResponse: onResponse,
            data: data,
            needsAuthorization: true
        })
    }
    removeReaction(data, onResponse){
        return this._requester.call({
            endpoint: new RemoveReactionEndpoint(),
            onResponse: onResponse,
            data: data,
            needsAuthorization: true
        })
    }
    getReactions(data, onResponse){
        return this._requester.call({
            endpoint: new GetReactionsEndpoint(),
            onResponse: onResponse,
            data: data,
            needsAuthorization: true
        })
    }
    getConversation(data, onResponse){
        return this._requester.call({
            endpoint: new ConversationEndpoint(),
            onResponse: onResponse,
            data: data,
            needsAuthorization: true
        })
    }

    sendMessage(data, onResponse){
        return this._requester.call({
            endpoint: new SendMessageEndpoint(),
            onResponse: onResponse,
            data: data,
            needsAuthorization: true
        })
    }

    getUser(data, onResponse){
        return this._requester.call({
            endpoint: new GetUserEndpoint(),
            onResponse: onResponse,
            data: data
        })
    }
}

export default ApiClient;