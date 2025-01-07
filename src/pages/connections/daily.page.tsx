import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { connections } from "./connections";

export async function getServerSideProps(ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{}>> {
  return {
    redirect: {
      destination: connections[0].url,
      permanent: true
    }
  }
}

export default function(){
  return <div></div>
}
