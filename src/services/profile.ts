import api from "../lib/axios";
import { useAppQuery, useAppMutation } from "@/lib/reactQuery";

export type Profile = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  address?: string;
  languages?: string[];
  achievements?: { title: string; description: string }[];
  experience?: string;
  projects?: string;
  clients?: string;
  awards?: string;
  // ...other properties
};

export type UpdateProfilePayload = Partial<Profile>;

const PROFILE_KEY = ["profile"];

export async function getProfile(): Promise<Profile> {
  const { data } = await api.get<Profile>("/profile");
  return data;
}

export async function updateProfile(
  payload: UpdateProfilePayload
): Promise<Profile> {
  const { data } = await api.put<Profile>("/profile", payload);
  return data;
}

// Use generic react-query wrappers
export function useProfile() {
  return useAppQuery(PROFILE_KEY, getProfile);
}

export function useUpdateProfile(options?: object) {
  return useAppMutation<Profile, UpdateProfilePayload>(updateProfile, options);
}
