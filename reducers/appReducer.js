export const ADD_TOKEN = "ADD_TOKEN";
export const REMOVE_TOKEN = "REMOVE_TOKEN";
export const WAITING_RESPONSE = "WAITING_RESPONSE";
export const CHANGE_HEADER_TITLE = "CHANGE_HEADER_TITLE";


const initialState = {
    token: "",
    loggedIn: false,
    waitingResponse: false,
    headerTitle: "Home"
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TOKEN:
            return { ...state, token: action.payload, loggedIn: true };
        case REMOVE_TOKEN:
            return { ...state, token: null, loggedIn: false };
        case WAITING_RESPONSE:
            return { ...state, waitingResponse: action.payload}
        case CHANGE_HEADER_TITLE:
            return {...state, headerTitle: action.payload}
        default:
            return state;
    }
};