import SingleBlog from "@/components/ui/singleBlog/singleBlog";
import { getDocumentBySlug, getDocumentSlugs } from "outstatic/server";
import { remark } from "remark";
import html from "remark-html";

async function getData(params) {
  const post = getDocumentBySlug("blogs", params.slug, [
    "title",
    "publishedAt",
    "slug",
    "author",
    "content",
    "coverImage",
    "readTime",
  ]);
  console.log("post in slug", post);
  const content = await markdownToHtml(post.content || "");

  return {
    ...post,
    content,
  };
}

export async function markdownToHtml(markdown) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}
export async function generateStaticParams() {
  const posts = getDocumentSlugs("blogs");
  return posts.map((slug) => ({ slug }));
}
export default async function Home({ params }) {
  const blog = await getData(params);
  return (
    <div>
      <SingleBlog blog={blog} />
    </div>
  );
}
