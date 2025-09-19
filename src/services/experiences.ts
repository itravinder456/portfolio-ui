import api from "../lib/axios";
import { useAppQuery } from "@/lib/reactQuery";
import { Education } from "./education";

export type Experience = {
  id?: string;
  company: string;
  roles: { role: string; period: string; description: string }[];
  duration?: string;
  location?: string;
  technologies?: string[];
  description?: string;
};

export type ExperiencesResponse = {
  experiences: Experience[];
  education: Education[];
};

export type ExperiencesData = Experience[];

const EXP_KEY = ["experiences"];

export async function getExperiences(): Promise<ExperiencesResponse> {
  const { data } = await api.get<ExperiencesResponse>("/experiences");
  return data;
}

export function useExperiences() {
  return useAppQuery(EXP_KEY, getExperiences);
}
