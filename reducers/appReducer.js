import {combineReducers, createStore} from "redux";
import { AsyncStorage } from "react-native";

export const ADD_TOKEN = "ADD_TOKEN";
export const ADD_SEARCH = "ADD_SEARCH";
export const REMOVE_TOKEN = "REMOVE_TOKEN";
export const WAITING_RESPONSE = "WAITING_RESPONSE";
export const EMAIL_TO_RECOVER = "EMAIL_TO_RECOVER";
export const VIDEO_TO_UPLOAD = "VIDEO_TO_UPLOAD";
export const USER_INFORMATION = "VIDEO_INFO_TO_WATCH";
export const CLEAR_HISTORY = "CLEAR_HISTORY";
export const MODIFY_REACTION = "MODIFY_REACTION";
export const SET_HISTORY = "SET_HISTORY";
export const SET_PROFILE = "SET_PROFILE";
const SET_VARIABLES_FROM_ASYNC_STORAGE = "SET_VARIABLES_FROM_ASYNC_STORAGE"
const SET_IS_FETCHING_CREDENTIALS = "SET_IS_FETCHING_CREDENTIALS"
import {ENV} from "../environment";


const initialState = {
    token: "",
    waitingResponse: false,
    emailToRecover: "",
    expandSidebar: false,
    videoToUpload: undefined,
    userEmail: "",
    videoVisualizationInfo: undefined,
    searchHistory: [],
    myProfile: {},
    isFetchingCredentials: true
};


const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TOKEN:
            AsyncStorage.multiSet([["Token", action.payload.token], ["LoggedUser", action.payload.userEmail]])
            return {...state, token: action.payload.token, userEmail: action.payload.userEmail};
        case REMOVE_TOKEN:
            AsyncStorage.multiRemove(["Token", "LoggedUser"])
            return {...initialState, isFetchingCredentials: false};
        case WAITING_RESPONSE:
            return {...state, waitingResponse: action.payload};
        case EMAIL_TO_RECOVER:
            return {...state, emailToRecover: action.payload};
        case VIDEO_TO_UPLOAD:
            return {...state, videoToUpload: action.payload}
        case USER_INFORMATION:
            return {...state, videoVisualizationInfo: action.payload}
        case ADD_SEARCH:
            return {
                ...state,
                searchHistory: [action.payload, ...state.searchHistory.filter(item => item !== action.payload)]
            }
        case CLEAR_HISTORY:
            return {...state, searchHistory: []}
        case MODIFY_REACTION:
            return {
                ...state,
                videoVisualizationInfo: {
                    ...state.videoVisualizationInfo,
                    reactions: {
                        like: action.payload.newLike,
                        dislike: action.payload.newDislike
                    }
                }
            }
        case SET_HISTORY:
            return {...state, searchHistory: action.payload}
        case SET_PROFILE:
            return {...state, myProfile: action.payload}

        case SET_VARIABLES_FROM_ASYNC_STORAGE:
            console.log("reducer", action.payload.isFetchingCredentials)
            return {...state, token: action.payload.token, userEmail: action.payload.userEmail,
                isFetchingCredentials: action.payload.isFetchingCredentials}
        case SET_IS_FETCHING_CREDENTIALS:
            return {...state, isFetchingCredentials: action.payload}

        default:
            return state;
    }
};

const reducers = combineReducers({appReducer});
export const store = createStore(reducers);

const validateToken = async () => {
    let [token, loggedUser] = await AsyncStorage.multiGet(["Token", "LoggedUser"])
    if(token[1] === null){
        store.dispatch({ type: SET_IS_FETCHING_CREDENTIALS, payload: false })
        return;
    }
    let headers = {'headers': {'Authorization': `Bearer ${token[1]}`}}

    const remoteApiUrl = ENV["apiUrl"] + "user/login"
    let tokenResponse = await fetch(remoteApiUrl, headers)
    if(tokenResponse.ok){
            store.dispatch({ type: SET_VARIABLES_FROM_ASYNC_STORAGE, payload: {token: token[1], userEmail: loggedUser[1],
                isFetchingCredentials: false}})
    } else {
        store.dispatch({ type: SET_IS_FETCHING_CREDENTIALS, payload: false })
    }
}

validateToken()