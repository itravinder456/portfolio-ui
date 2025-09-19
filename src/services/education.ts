import api from "./axios";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export type Education = {
  id?: string;
  institution: string;
  degree: string;
  year?: string;
};

const EDU_KEY = ["education"];

export async function getEducation(): Promise<Education[]> {
  const { data } = await api.get<Education[]>("/education");
  return data;
}

export function useEducation() {
  return useQuery<Education[], AxiosError>(EDU_KEY, getEducation, {
    staleTime: 1000 * 60 * 5,
  });
}
