import axios, { AxiosInstance } from 'axios';

export default abstract class ClientBase {
    protected readonly _client: AxiosInstance

    constructor(baseUrl: string) {
        this._client = axios.create( { baseURL: baseUrl, headers: { 'content-type': 'application/json' } } );
    }
}