import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

const url = `https://forms.gle/HhQSGitE65vyjQKr8`
export async function getServerSideProps(ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{}>> {
  return {
    redirect: {
      destination: url,
      permanent: true
    }
  }
}

export default function(){
  return <div></div>
}
