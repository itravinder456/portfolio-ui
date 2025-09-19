import api from "../lib/axios";
import { useAppQuery } from "@/lib/reactQuery";

export type Skill = {
  id?: string;
  name: string;
  category?: string;
  proficiency?: string;
  level?: string | number;
  iconUrl: string;
  description?: string;
  isTopSkill?: boolean;
};

const SKILL_KEY = ["skills"];

export async function getSkills(): Promise<Skill[]> {
  const { data } = await api.get<Skill[]>("/skills");
  return data;
}

export function useSkills() {
  return useAppQuery(SKILL_KEY, getSkills);
}
