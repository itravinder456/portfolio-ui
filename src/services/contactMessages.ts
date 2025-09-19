import api from "./axios";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export type ContactMessage = {
  id?: string;
  name: string;
  email: string;
  message: string;
  date?: string;
};

const CONTACT_MSG_KEY = ["contactMessages"];

export async function getContactMessages(): Promise<ContactMessage[]> {
  const { data } = await api.get<ContactMessage[]>("/contactMessages");
  return data;
}

export function useContactMessages() {
  return useQuery<ContactMessage[], AxiosError>(
    CONTACT_MSG_KEY,
    getContactMessages,
    {
      staleTime: 1000 * 60 * 5,
    }
  );
}
