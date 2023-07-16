import { NextApiHandler } from "next";
import { claimsIsAuthorized, getUser, userIsAuthorized } from "~/auth0Util";
import { databaseRequest } from "~/db/connection";

import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0"


const nextApiHandler: NextApiHandler = withApiAuthRequired(async (req, res) => {
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

export default nextApiHandler;