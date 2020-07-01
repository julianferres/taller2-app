export class Endpoint {
    static url() {
        throw new Error("You have to implement the method");
    }

    url() {
        return this.constructor.url();
    }

    contentType() {
        return 'application/json';
    }

    method() {
        throw new Error("You have to implement the method");
    }

    needsAuthorization() {
        throw new Error("You have to implement the method");
    }
}
