import api from "../lib/axios";
import { useAppQuery, useAppMutation } from "@/lib/reactQuery";

export type Blog = {
  id?: string;
  title: string;
  content: string;
  date?: string;
};

export async function getBlogs(): Promise<Blog[]> {
  const { data } = await api.get<Blog[]>("/blogs");
  return data;
}

export function useBlogs() {
  return useAppQuery(["blogs"], getBlogs);
}

export function useCreateBlog() {
  //   return useAppMutation(createBlog);
}
