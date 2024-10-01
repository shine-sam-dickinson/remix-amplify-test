import {
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

import { OpenFeatureProvider, OpenFeature } from "@openfeature/react-sdk";
import { FlagsmithClientProvider } from "@openfeature/flagsmith-client-provider";
import flagsmith from "flagsmith/isomorphic";
import { useEffect, useRef } from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  const renderRef = useRef(true);
  useEffect(() => {
    if (renderRef?.current) {
      renderRef.current = false;
      flagsmith
        .init({
          environmentID: "JgTEMB8erZQ5LkamB8bWQL",
          fetch: fetch,
        })
        .then(() => {
          const flagsmithClientProvider = new FlagsmithClientProvider({
            environmentID: "JgTEMB8erZQ5LkamB8bWQL",
            flagsmithInstance: flagsmith,
          });
          OpenFeature.setProvider(flagsmithClientProvider);
        });
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://api.payway.com.au/rest/v1/payway.js"></script>
        <Meta />
        <Links />
      </head>
      <OpenFeatureProvider>
        <body className="prose">
          <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/conduct">Code of Conduct</NavLink>
            <NavLink to="/privacy">Privacy Policy</NavLink>
            <NavLink to="/blog">Blog</NavLink>
          </nav>
          {children}
          <ScrollRestoration />
          <Scripts />
        </body>
      </OpenFeatureProvider>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
