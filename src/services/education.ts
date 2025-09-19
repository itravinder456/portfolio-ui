import api from "../lib/axios";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export type Education = {
  id?: string;
  degree: string;
  institution: string;
  startYear?: number;
  endYear?: number;
  description?: string;
  field?: string;
  period?: string;
  location?: string;
  achievements?: string[];
};

const EDU_KEY = ["education"];

export async function getEducation(): Promise<Education[]> {
  const { data } = await api.get<Education[]>("/education");
  return data;
}

export function useEducation() {
  return useQuery<Education[], AxiosError>({
    queryKey: EDU_KEY,
    queryFn: getEducation,
    staleTime: 1000 * 60 * 5,
  });
}
