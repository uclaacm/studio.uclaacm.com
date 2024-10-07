import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

export async function getServerSideProps(ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{}>> {
  return {
    redirect: {
      destination: "https://connections.swellgarfo.com/game/-O8ZLpB3IL75tYy4QSLq",
      permanent: true
    }
  }
}

export default function(){
  return <div></div>
}
