import Head from "next/head";

export type MetadataProps = {
  title?: string,
  author?: string,
  description?: string,
  keywords?: string[],
  url?: string,
} & (WebsiteMetadataProps | ArticleMetadataProps);

type WebsiteMetadataProps = {
  type?: "website",
};

type ArticleMetadataProps = {
  type: "article",
  id: string,
  publishedTime?: Date,
  modifiedTime?: Date,
  expirationTime?: Date,
  author?: string[],
  section?: string,
}

export default function Metadata(props: MetadataProps) {
  const {
    title,
    author,
    description,
    keywords,
    type = "website",
  } = props;

  return (
    <Head>
      <title>{
        // note: a template literal is required here because of a nextjs bug
        `${title ? `${title} | ` : ""}ACM Studio`
      }</title>
      {author && <meta name="author" content={author} />}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords.join(",")} />}
      {type && <meta property="og:type" content={type} />}
      {props.url && <meta property="og:url" content={props.url} />}
      {props.type === "article" && <>
        {props.publishedTime && <meta property="article:published_time" content={props.publishedTime.toISOString()} />}
        {props.modifiedTime && <meta property="article:modified_time" content={props.modifiedTime.toISOString()} />}
        {props.expirationTime && <meta property="article:expiration_time" content={props.expirationTime.toISOString()} />}
        {props.section && <meta property="article:section" content={props.section} />}
        {<meta property="og:image" content={`https://acmstudio.org/api/image?id=${props.id}`} />}
      </>}

    </Head>
  );
}
