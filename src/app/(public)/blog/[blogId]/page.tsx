import React from "react";

type Props = {
  params: { blogId: string };
};

const BlogPostPage = async (props: Props) => {
  const blogId = (await props.params).blogId;
  console.log("Blog ID:", blogId);
  // Simulate fetching blog post data based on blogId
  // const blogPost = await fetchBlogPost(blogId);
  return <div>Blog Post Page: {blogId}</div>;
};

export default BlogPostPage;
