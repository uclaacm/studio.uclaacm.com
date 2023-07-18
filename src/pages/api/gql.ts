import { NextApiHandler } from "next";
import { claimsIsAuthorized, getUser, userIsAuthorized } from "~/auth0Util";
import { databaseRequest } from "~/db/connection";

import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0"

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL.trim() === "true";

const nextApiHandlerServer: NextApiHandler = withApiAuthRequired(async (req, res) => {
  const { user } = await getSession(req, res);
  if(claimsIsAuthorized(user)){
    const { query, variables } = req.body;
    const result = await databaseRequest({ query, variables });
    return res.json(result);
  }
  else {
    res.status(401).end("Unauthorized");
  }
});

const nextApiHandlerLocal = async (req, res) => {
  const { query, variables } = req.body;
  const result = await databaseRequest({ query, variables });
  return res.json(result);
}

export default isLocal ? nextApiHandlerLocal : nextApiHandlerServer;