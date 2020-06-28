export const ADD_TOKEN = "ADD_TOKEN";
export const REMOVE_TOKEN = "REMOVE_TOKEN";
export const WAITING_RESPONSE = "WAITING_RESPONSE";
export const EXPAND_SIDEBAR = "EXPAND_SIDEBAR"

const initialState = {
    token: "",
    loggedIn: false,
    waitingResponse: false,
    expandSidebar: false
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TOKEN:
            return { ...state, token: action.payload, loggedIn: true };
        case REMOVE_TOKEN:
            return { ...state, token: null, loggedIn: false };
        case WAITING_RESPONSE:
            return { ...state, waitingResponse: action.payload}
        case EXPAND_SIDEBAR:
            return {...state, expandSidebar: action.payload}
        default:
            return state;
    }
};