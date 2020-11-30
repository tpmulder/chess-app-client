import ClientBase from "./base/ClientBase";

class ApiClient extends ClientBase {
    constructor() {
        super(`${process.env.REACT_APP_API}`)
    }

    async getAccessToken() {
        const token = localStorage.getItem(`${process.env.REACT_APP_ACCESS_TOKEN_STORAGE}`);

        if (token === null) {
            const result = await this._client.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, { 
                client_id:`${process.env.REACT_APP_API_CLIENT_ID}`,
                client_secret:`${process.env.REACT_APP_API_CLIENT_SECRET}`,
                audience:`${process.env.REACT_APP_API_AUDIENCE}`,
                grant_type:"client_credentials"
              }, { headers: { 'content-type': 'application/json' } })

              const accessToken = result.data.access_token;
    
              console.log(accessToken);
    
              localStorage.setItem('api-token', accessToken);

              return accessToken;
        } else {
            return token;
        }
    }

    async get<T>(url: string): Promise<T[]> {
        let response = await this._client.get<T[]>(url);

        return response.data;
    }

    async create<T>(url: string, item: T): Promise<any> {
        let response = await this._client.post(url, item);

        return response.data;
    }
}

export default new ApiClient();