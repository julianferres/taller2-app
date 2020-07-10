import {combineReducers, createStore} from "redux";

export const ADD_TOKEN = "ADD_TOKEN";
export const ADD_SEARCH = "ADD_SEARCH";
export const REMOVE_TOKEN = "REMOVE_TOKEN";
export const WAITING_RESPONSE = "WAITING_RESPONSE";
export const EMAIL_TO_RECOVER = "EMAIL_TO_RECOVER";
export const VIDEO_TO_UPLOAD = "VIDEO_TO_UPLOAD";
export const USER_EMAIL = "USER_EMAIL";
export const VIDEO_INFO_TO_WATCH = "VIDEO_INFO_TO_WATCH";
export const CLEAR_HISTORY = "CLEAR_HISTORY";
export const MODIFY_REACTION = "MODIFY_REACTION";

const initialState = {
    token: "",
    loggedIn: false,
    waitingResponse: false,
    emailToRecover: "",
    expandSidebar: false,
    videoToUpload: undefined,
    userEmail: "",
    videoVisualizationInfo: undefined,
    searchHistory: []
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TOKEN:
            return {...state, token: action.payload, loggedIn: true};
        case REMOVE_TOKEN:
            return {...state, token: null, loggedIn: false};
        case WAITING_RESPONSE:
            return {...state, waitingResponse: action.payload};
        case EMAIL_TO_RECOVER:
            return {...state, emailToRecover: action.payload};
        case VIDEO_TO_UPLOAD:
            return {...state, videoToUpload: action.payload}
        case USER_EMAIL:
            return {...state, userEmail: action.payload}
        case VIDEO_INFO_TO_WATCH:
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
        default:
            return state;
    }
};

const reducers = combineReducers({appReducer});
export const store = createStore(reducers);