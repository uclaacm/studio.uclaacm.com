import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

export async function getServerSideProps(ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{}>> {
  return {
    redirect: {
      destination: "https://connections.swellgarfo.com/game/-O9B_LMWRWaoEDF4BlZs",
      permanent: true
    }
  }
}

export default function(){
  return <div></div>
}
