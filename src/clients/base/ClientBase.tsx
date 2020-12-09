import axios, { AxiosInstance } from 'axios';

export default abstract class ClientBase {
    protected readonly _client: AxiosInstance

    constructor(baseUrl: string, needsAuthorization: boolean, localStorageName?: string) {
        this._client = axios.create( { baseURL: baseUrl, headers: { 'content-type': 'application/json' } } );

        if (needsAuthorization)
        this._client.interceptors.request.use((config) => {
            const token = localStorage.getItem(`${localStorageName}`);

            if(token) {
                config.headers.Authorization =  `bearer ${token}`;
            }

            return config;
        });
    }
}