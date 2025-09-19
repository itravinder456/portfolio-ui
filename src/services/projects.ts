import api from "../lib/axios";
import { useAppQuery } from "@/lib/reactQuery";

export type Project = {
  id?: string;
  title: string;
  description?: string;
  imageUrl?: string;
  liveLink?: string;
  repoLink?: string;
  techStack?: string[];
  role?: string;
  duration?: string;
  type?: "Professional" | "Personal";
  createdAt?: string;
  updatedAt?: string;
};

const PROJECT_KEY = ["projects"];

export async function getProjects(): Promise<Project[]> {
  const { data } = await api.get<Project[]>("/projects");
  return data;
}

export function useProjects() {
  return useAppQuery(PROJECT_KEY, getProjects);
}
