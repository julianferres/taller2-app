import {Endpoint} from "./Endpoint"

export class SignUpEndpoint extends Endpoint{
    static url(){
        return  "/user"
    }

    method() {
        return 'POST'
    }


}