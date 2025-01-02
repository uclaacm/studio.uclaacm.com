import type { NextApiRequest, NextApiResponse } from 'next'
import { getArticle } from '~/api/notion/schema';

type ResponseData = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if(req.method !== "GET"){
	res.status(405).json({message: "Method not allowed"});
  }
  if(!("id" in req.query)) {
	res.status(400).json({message: "Missing id"});
  }

  // get article from notion
  const notionId = req.query.id instanceof Array ? req.query.id[0] : req.query.id;
  const article = await getArticle({ id: notionId });
  const image = article.image;
  if(image === undefined){
	res.status(404).json({message: "Image not found"});
  }

  // redirect to image
  res.redirect(302, image);
}