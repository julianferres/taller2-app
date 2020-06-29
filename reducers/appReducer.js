export const ADD_TOKEN = "ADD_TOKEN";
export const REMOVE_TOKEN = "REMOVE_TOKEN";
export const WAITING_RESPONSE = "WAITING_RESPONSE";
export const EMAIL_TO_RECOVER = "EMAIL_TO_RECOVER";
export const VIDEO_TO_UPLOAD = "VIDEO_TO_UPLOAD";

const initialState = {
    token: "",
    loggedIn: true,
    waitingResponse: false,
    emailToRecover: "",
    expandSidebar: false,
    videoToUpload: undefined
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TOKEN:
            return { ...state, token: action.payload, loggedIn: true };
        case REMOVE_TOKEN:
            return { ...state, token: null, loggedIn: false };
        case WAITING_RESPONSE:
            return { ...state, waitingResponse: action.payload};
        case EMAIL_TO_RECOVER:
            return { ...state, emailToRecover: action.payload};
        case VIDEO_TO_UPLOAD:
            return {...state, videoToUpload: action.payload}
          default:
            return state;
    }
};