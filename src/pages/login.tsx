import { useAuth0 } from "@auth0/auth0-react";
import { Auth0Client } from "@auth0/auth0-spa-js";

import Container from "@mui/material/Container"
import Button from "@mui/material/Button"

import { client } from "~/auth0"

export default function Login(){
	const loginWithRedirect = async () => {
		await client.loginWithRedirect({
			authorizationParams: {
				redirect_uri: "https://localhost:3000/",
			}
		})
	}
	return (
		<Container maxWidth="lg">
			<Button onClick={() => loginWithRedirect()}>Login</Button>
		</Container>
	)
}