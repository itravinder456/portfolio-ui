import api from "../lib/axios";
import { useAppQuery } from "@/lib/reactQuery";

export type Blog = {
  data: BlogItem[];
};

export type BlogItem = {
  id: string;
  title: string;
  summary: string;
  category: string;
  publishedDate: string;
  tags: string[];
};

export async function getBlogs(): Promise<BlogItem[]> {
  const { data } = await api.get<Blog>("/blogs");
  return data?.data;
}

export function useBlogs() {
  return useAppQuery(["blogs"], getBlogs);
}

export function useCreateBlog() {
  //   return useAppMutation(createBlog);
}
