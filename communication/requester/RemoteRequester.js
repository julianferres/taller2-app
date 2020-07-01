import { Requester } from "./Requester.js";
import {store} from "../../reducers/appReducer";

class RemoteRequester extends Requester {
    constructor(url) {
        super();
        this._baseUrl = url;
    }

    call({ endpoint, onResponse, data = undefined, needsAuthorization = false }) {
        const request = this._buildRequest(endpoint, data, needsAuthorization);
        let url = endpoint.url();
        if (endpoint.method() === 'GET' && data) {
            url += "?" + this._dataToQueryString(data);
        }

        console.log(this._baseUrl + url)
        console.log(request)
        return fetch(this._baseUrl + url, request)
            .then(response => onResponse(response))
            .catch(exception => {
                console.log("Exception in API request: ", exception);
            })
    }

    _buildRequest(endpoint, data, needsAuthorization) {
        let headers = this._buildHeadersFor(endpoint, needsAuthorization);
        let requestOptions = {
            method: endpoint.method(),
            headers: headers
        };

        if (endpoint.method() !== 'GET') {
            let encoder = this._encoderFor(endpoint.contentType());
            Object.assign(headers, encoder.headers());
            Object.assign(requestOptions, { body: encoder.encode(data) });
        }
        return requestOptions;
    }

    _buildHeadersFor(endpoint, needsAuthorization) {
        let headers = {};
        if (endpoint.contentType() && endpoint.contentType() !== "multipart/form-data") {
            headers['Content-Type'] = endpoint.contentType();
        }
        if(needsAuthorization){
            console.log("token", store.getState().appReducer.token)
            headers['Authorization'] = `Bearer ${store.getState().appReducer.token}`
        }
        return headers;
    }

    _dataToQueryString(data) {
        let keyValuePairs = [];
        for (let i = 0; i < Object.keys(data).length; i += 1) {
            let key = Object.keys(data)[i];
            let value = Object.values(data)[i];
            if (value) {
                keyValuePairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
            }
        }
        return keyValuePairs.join('&');
    }

    _encoderFor(contentType) {
        let encoders = [new JsonEncoder(), new MultiPartEncoder()];
        return encoders.find(enc => enc.accepts(contentType));
    }
}

class Encoder {
    accepts(mimeType) {
        throw new Error("You have to implement the method");
    }

    headers() {
        throw new Error("You have to implement the method");
    } s

    encode(requestBody) {
        throw new Error("You have to implement the method");
    }
}

class MultiPartEncoder extends Encoder {
    accepts(mimeType) {
        return mimeType === 'multipart/form-data'
    }

    headers() {
        return { Accept: "application/json", "Content-Type" : "multipart/form-data" }
    }

    encode(requestBody) {
        let formData = new FormData();

        for (let field in requestBody) {
            let value = requestBody[field];

            if (value !== undefined) {
                formData.append(field, value);
            }
        }

        return formData;
    }

    _generateBodyFromFiles(files) {
        let formData = new FormData();
        Object.keys(files).forEach(key => {
            const file = files[key];
            formData.append(key, file);
        });
        return formData
    }
}

class JsonEncoder extends Encoder {
    accepts(mimeType) {
        return mimeType === 'application/json'
    }

    headers() {
        return { 'Content-Type': 'application/json' }
    }

    encode(requestBody) {
        return JSON.stringify(requestBody);
    }
}

export default RemoteRequester;