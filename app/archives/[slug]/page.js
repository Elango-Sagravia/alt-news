import SingleBlog from "@/components/ui/singleBlog/singleBlog";
import { getDocumentBySlug } from "outstatic/server";
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

export default async function Home({ params }) {
  const blog = await getData(params);
  return (
    <div>
      <SingleBlog blog={blog} />
    </div>
  );
}
