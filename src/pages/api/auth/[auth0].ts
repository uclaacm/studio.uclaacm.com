import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { handleAuth } from '@auth0/nextjs-auth0';

const handler = handleAuth();

export default async function Auth(req: NextApiRequest, res: NextApiResponse) {
	console.log(process.env)
	handler(req, res);
}