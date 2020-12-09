import { AxiosResponse } from "axios";
import ClientBase from "./base/ClientBase";

class ApiClient extends ClientBase {
    constructor() {
        super(`${process.env.REACT_APP_API}`, true, `${process.env.REACT_APP_TOKEN_STORAGE}`)
    }

    async get<T>(route: string): Promise<T> {
        return await this.operate(() => this._client.get<T>(route));
    }

    async put<T>(route: string, item: T): Promise<T> {
        return await this.operate(() => this._client.put<T>(route, item));
    }

    async post<T>(route: string, item: Partial<T>): Promise<T> {
        return await this.operate(() => this._client.post<T>(route, item));
    }

    async operate<T>(method: () => Promise<AxiosResponse<T>>) {
        try {
            const response = await method();

            if (this.isSuccessStatuscode(response.status)) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            return response.data;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }

    isSuccessStatuscode(statuscode: number): boolean {
        return (statuscode > 200 && statuscode >= 300);
    }
}

export default new ApiClient();