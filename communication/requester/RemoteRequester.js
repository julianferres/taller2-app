import {Requester} from "./Requester.js";

class RemoteRequester extends Requester {
    constructor(url) {
        super();
        this._baseUrl = url;
    }

    call({endpoint, onResponse, data = undefined}) {
        const request = this._buildRequest(endpoint, data);
        let url = endpoint.url();
        if (endpoint.method() === 'GET' && data) {
            url += "?" + this._dataToQueryString(data);
        }

        return fetch(this._baseUrl + url, request)
            .then(result => result.json())
            .then(jsonResponse => {
                return onResponse(jsonResponse);
            })
            .catch(exception => {
                console.log("Exception in API request: ", exception);
            })
    }

    _buildRequest(endpoint, data) {
        let headers = this._buildHeadersFor(endpoint);
        let requestOptions = {
            method: endpoint.method(),
            headers: headers
        };

        if (endpoint.method() !== 'GET') {
            let encoder = this._encoderFor(endpoint.contentType());
            Object.assign(headers, encoder.headers());
            Object.assign(requestOptions, {body: encoder.encode(data)});
        }
        return requestOptions;
    }

    _buildHeadersFor(endpoint) {
        let headers = {};
        if (endpoint.contentType() && endpoint.contentType() !== "multipart/form-data") {
            headers['Content-Type'] = endpoint.contentType();
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
    }s

    encode(requestBody) {
        throw new Error("You have to implement the method");
    }
}

class MultiPartEncoder extends Encoder {
    accepts(mimeType) {
        return mimeType === 'multipart/form-data'
    }

    headers() {
        return {}
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
        return {'Content-Type': 'application/json'}
    }

    encode(requestBody) {
        return JSON.stringify(requestBody);
    }
}

export default RemoteRequester;