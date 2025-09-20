import api from "../lib/axios";
import { useAppQuery, useAppMutation } from "@/lib/reactQuery";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export type Profile = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  address?: string;
  languages?: string[];
  nationality?: string;
  achievements?: {
    title: string;
    description: string;
    date: string;
    company: string;
  }[];
  location?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  yearsOfExperience?: number;
  skills?: string[];
  summary?: string;
  freelance?: string;
  contactPageSummary?: string;
  aboutPageSummary?: string;
  homePageSummary?: string;
  homePageSkills?: string[];
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  linkedin: string;
  github: string;
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

/**
 * Calls the backend API to generate a resume (PDF or other format).
 * @param payload Optional data to customize the resume generation (e.g., template, sections, etc.)
 * @returns The resume file as a Blob or a download URL, depending on backend implementation.
 */
export async function generateResume(
  payload?: GenerateResumePayload
): Promise<Blob> {
  const response = await api.post("/profile/generate-resume", payload, {
    responseType: "blob", // Expecting a file (PDF) as response
  });
  return response.data;
}

// Use generic react-query wrappers
export function useProfile() {
  return useAppQuery(PROFILE_KEY, getProfile);
}

export function useUpdateProfile(options?: object) {
  return useAppMutation<Profile, UpdateProfilePayload>(updateProfile, options);
}

type GenerateResumePayload = Record<string, unknown>;

/**
 * React hook to call the generateResume service.
 * Usage: const mutation = useGenerateResume();
 * mutation.mutate(payload);
 */
export function useGenerateResume() {
  return useMutation<Blob, Error, GenerateResumePayload | undefined, unknown>({
    mutationFn: generateResume,
  });
}
