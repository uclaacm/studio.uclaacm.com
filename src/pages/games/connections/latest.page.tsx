import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { games } from "./games";
import formatDate from "~/util/formatDate";

export async function getServerSideProps(ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{}>> {
  const latestGame = games[0];

  return {
    redirect: {
      destination: "url" in latestGame ? latestGame.url : `/games/connections/${formatDate(latestGame.date, "url")}`,
      permanent: false,
    }
  }
}

export default function(){
  return <div></div>
}
