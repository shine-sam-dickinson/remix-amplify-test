import { json, LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";

export async function loader({ params }: LoaderFunctionArgs) {
  const resp = await fetch(`https://us.i.posthog.com${params.args}`);
  return json(await resp.json());
}

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const resp = await fetch(`https://us.i.posthog.com/${params.args}`, {
    duplex: "half",
    method: request.method,
    body: request.body,
  });
  return json(await resp.json());
};
