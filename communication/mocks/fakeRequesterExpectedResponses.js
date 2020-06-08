import {LoginEndpoint} from "../endpoints/LoginEndpoint";

const fakeRequesterExpectedResponses = () => {
    return {
        [LoginEndpoint.name]:
            JSON.stringify({
                "token": "QpwL5tke4Pnpja7X4"
            }),
    }
};

export default fakeRequesterExpectedResponses;