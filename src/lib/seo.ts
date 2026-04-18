import { useEffect } from "react";

const BASE_URL = "https://badgrtech.com";

type PageMeta = {
  canonical?: string;
  description?: string;
  title: string;
};

const ensureMeta = (name: string) => {
  let meta = document.head.querySelector(
    `meta[name="${name}"]`
  ) as HTMLMetaElement | null;

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", name);
    document.head.appendChild(meta);
  }

  return meta;
};

const ensurePropertyMeta = (property: string) => {
  let meta = document.head.querySelector(
    `meta[property="${property}"]`
  ) as HTMLMetaElement | null;

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", property);
    document.head.appendChild(meta);
  }

  return meta;
};

const ensureCanonical = () => {
  let link = document.head.querySelector(
    'link[rel="canonical"]'
  ) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  return link;
};

export function usePageMeta({ canonical, description, title }: PageMeta) {
  useEffect(() => {
    document.title = title;

    if (description) {
      ensureMeta("description").setAttribute("content", description);
      ensurePropertyMeta("og:description").setAttribute("content", description);
      ensureMeta("twitter:description").setAttribute("content", description);
    }

    ensurePropertyMeta("og:title").setAttribute("content", title);
    ensureMeta("twitter:title").setAttribute("content", title);

    const path = canonical ?? window.location.pathname;
    ensureCanonical().setAttribute("href", `${BASE_URL}${path}`);
  }, [canonical, description, title]);
}
