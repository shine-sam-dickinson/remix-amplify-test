import directus from "../lib/directus";
import { readItems } from "@directus/sdk";
import { useLoaderData } from "@remix-run/react";

export const loader = async () => {
  const posts = await directus.request(
    readItems("posts", {
      fields: ["slug", "title", "published_date", { author: ["name"] }],
      sort: ["-published_date"],
    })
  );
  return { posts };
};

export default function Blog() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.slug}>
              <a href={`/blog/${post.slug}`}>
                <h2>{post.title}</h2>
              </a>
              <span>
                {post.published_date} &bull; {post.author.name}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
