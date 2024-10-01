import type { MetaFunction } from "@remix-run/node";
// import directus from "../lib/directus";
// import { readSingleton } from "@directus/sdk";
import { useLoaderData } from "@remix-run/react";
import { useCounterStore } from "../lib/store";
import { Button } from "../components/ui/button";
// import { useFeatureFlagEnabled } from "posthog-js/react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Suspense } from "react";
import { HomepageListResponse } from "../lib/Api";
import { useObjectFlagValue } from "@openfeature/react-sdk";
export const loader = async () => {
  // const global = await directus.request(readSingleton("global"));
  const content: HomepageListResponse = await (
    await fetch("http://localhost:1337/api/homepage?populate=*")
  ).json();
  return { content };
};

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

function Counter() {
  const val = useCounterStore.useCounter();
  return <span className="p-4 text-5xl">{val}</span>;
}

function Buttons() {
  const { increment, decrement } = useCounterStore.useActions();
  return (
    <div>
      <Button onClick={() => increment()}>+</Button>
      <Button onClick={() => decrement()}>-</Button>
    </div>
  );
}

export default function Index() {
  const { content } = useLoaderData<typeof loader>();
  const image = content.data?.image?.at(0)?.formats.thumbnail;
  const flags = useObjectFlagValue("test-one", {});
  // const { title, description } = global;
  // const myFlag = useFeatureFlagEnabled("my-flag");
  // const myFlag = false;

  return (
    <div>
      {JSON.stringify(flags)}
      {/* <h1>{title}</h1> */}
      {/* {myFlag ? <p>{description}</p> : <p>Flag Not Set</p>} */}
      <Counter />
      <Buttons />
      <Suspense fallback={<div>Loading...</div>}>
        <div id="image">
          <img
            src={image?.url ? `http://localhost:1337/${image?.url}` : ""}
            alt={content.data?.image?.at(0)?.alternativeText ?? ""}
          />
        </div>
        {content && <BlocksRenderer content={content.data?.main} />}
      </Suspense>
    </div>
  );
}
