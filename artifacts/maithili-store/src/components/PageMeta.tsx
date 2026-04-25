import { Helmet } from "react-helmet-async";

interface Props {
  title: string;
  description?: string;
  ogImage?: string;
}

const SITE = "Maithili Store";
const DEFAULT_DESC =
  "Maithili Store — Har kaam ka ek tool. JSON, regex, invoice, resume, palette, pomodoro — sab ek hi jagah, free.";

export function PageMeta({ title, description = DEFAULT_DESC, ogImage }: Props) {
  const fullTitle = title === SITE ? title : `${title} · ${SITE}`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {ogImage ? <meta property="og:image" content={ogImage} /> : null}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
