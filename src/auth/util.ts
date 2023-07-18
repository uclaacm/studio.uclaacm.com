import { User } from "@auth0/auth0-react";
import { Claims } from "@auth0/nextjs-auth0";

const host: string = process.env.HOST;

export async function getUser(): Promise<User | null> {
	return fetch(`${host}/api/auth/me`).then(res => res.json() as User).catch(_ => null);
}

export function userIsAuthorized(user?: User) {
	return (user && user["https://studio.uclaacm.com/roles"] || []).includes("Admin");
}

export function claimsIsAuthorized(claims: Claims) {
	return (claims["https://studio.uclaacm.com/roles"] || []).includes("Admin");
}