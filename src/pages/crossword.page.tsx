import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

export async function getServerSideProps(ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{}>> {
  return {
    redirect: {
      destination: "https://crosswordlabs.com/view/2024-10-20-816",
      permanent: true
    }
  }
}

export default function(){
  return <div></div>
}
