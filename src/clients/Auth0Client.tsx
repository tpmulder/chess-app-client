import { useAuth0 } from "@auth0/auth0-react";
import { GetTokenSilentlyOptions } from "@auth0/auth0-spa-js";
import ClientBase from "./base/ClientBase";

class Auth0Client extends ClientBase {
    constructor() {
        const scopes = `${process.env.REACT_APP_AUTH0_SCOPES}`.split('-').join(' ');
        const domain = process.env.REACT_APP_AUTH0_DOMAIN;
        const id = process.env.REACT_APP_AUTH0_ID;
        const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

        super(`https://${domain}/api/v2`, true, `@@auth0spajs@@::${id}::${audience}::openid profile email ${scopes} offline_access`);
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