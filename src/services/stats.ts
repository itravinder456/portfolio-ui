import api from "./axios";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export type Stats = {
  yearsExperience?: number;
  completedProjects?: number;
  happyClients?: number;
  awards?: number;
  // extend as required
};

const STATS_KEY = ["stats"];

export async function getStats(): Promise<Stats> {
  const { data } = await api.get<Stats>("/stats");
  return data;
}

export function useStats() {
  return useQuery<Stats, AxiosError>(STATS_KEY, getStats, {
    staleTime: 1000 * 60 * 5,
  });
}
