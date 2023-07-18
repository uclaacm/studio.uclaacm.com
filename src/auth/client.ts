import { Auth0Client } from "@auth0/auth0-spa-js";

const client = new Auth0Client({
	domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
	clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
});

export default client;