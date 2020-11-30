import { useAuth0 } from "@auth0/auth0-react";
import { GetTokenSilentlyOptions } from "@auth0/auth0-spa-js";
import ClientBase from "./base/ClientBase";

class Auth0Client extends ClientBase {
    constructor() {
        super(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2`);
    }

    async getAccessToken(tokenFunc: (options?: GetTokenSilentlyOptions) => Promise<string>) {        
        try {
            return await tokenFunc({
                audience: `${process.env.REACT_APP_AUTH0_CLIENT_AUDIENCE}`
            });
        }
        catch (error) {
            throw error;
        }
    }

    async getUserInfo(url: string) {

    }
}

export default new Auth0Client();