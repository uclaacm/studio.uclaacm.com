import Head from "next/head";

export type MetadataProps = {
  title?: string;
};

export default function Metadata(props: MetadataProps) {
  const { title } = props;

  return (
    <Head>
      <title>{
        // note: a template literal is required here because of a nextjs bug
        `${title ? `${title} | ` : ""}ACM Studio`
      }</title>
    </Head>
  );
}
