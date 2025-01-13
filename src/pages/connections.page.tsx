import { GetServerSidePropsResult } from "next";

export function getServerSideProps(): GetServerSidePropsResult<{}> {
	return {
		redirect: {
			destination: "/games/connections",
			permanent: true,
		},
	};
}

export default function(){
	return <div></div>
}