// src/components/common/Seo.tsx
import Head from "next/head";

interface SeoProps {
  title: string;
  description?: string;
}

export default function Seo({ title, description }: SeoProps) {
  return (
    <Head>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {/* You can add more SEO tags here, e.g. OG: */}
      {/* <meta property="og:title" content={title} />
      <meta property="og:description" content={description} /> */}
    </Head>
  );
}
