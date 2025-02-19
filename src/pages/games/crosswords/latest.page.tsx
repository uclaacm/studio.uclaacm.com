import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { crosswords } from "./crosswords";

export async function getServerSideProps(ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{}>> {
  const latestGame = crosswords[0];

  return {
	redirect: {
	  destination: latestGame.url,
	  permanent: false,
	}
  }
}

export default function(){
  return <div></div>
}
