import { LoaderFunctionArgs } from "@remix-run/node";
import directus from "../lib/directus";
import { readItem } from "@directus/sdk";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug } = params;

  const page = await directus.request(readItem("pages", slug as string));
  return page;
};

export default function Page() {
  const { title, content } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  );
}
