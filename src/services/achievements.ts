import api from "../lib/axios";
import { useAppQuery } from "@/lib/reactQuery";

export type Achievement = {
  id?: string;
  title: string;
  description?: string;
  date?: string;
};

const ACH_KEY = ["achievements"];

export async function getAchievements(): Promise<Achievement[]> {
  const { data } = await api.get<Achievement[]>("/achievements");
  return data;
}

export function useAchievements() {
  return useAppQuery(ACH_KEY, getAchievements);
}
