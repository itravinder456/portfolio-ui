import api from "../lib/axios";
import { useAppQuery } from "@/lib/reactQuery";

export type Experience = {
  id?: string;
  company: string;
  role: string;
  duration?: string;
  description?: string;
};

const EXP_KEY = ["experiences"];

export async function getExperiences(): Promise<Experience[]> {
  const { data } = await api.get<Experience[]>("/experiences");
  return data;
}

export function useExperiences(options?: object) {
  return useAppQuery(EXP_KEY, getExperiences, options);
}
