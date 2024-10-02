/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */
import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
// eslint-disable-next-line import/no-named-as-default

function PosthogInit() {
  // useEffect(() => {
  //   posthog.init("phc_XT3WSEYuEXGYhxdKowto6EM5ds6TBLhrPP7lScPUVyA", {
  //     // api_host: "https://us.i.posthog.com",
  //     api_host: "/flag",
  //     person_profiles: "always", // or 'always' to create profiles for anonymous users as well
  //   });
  // }, []);

  return null;
}

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
      <PosthogInit />
    </StrictMode>
  );
});
