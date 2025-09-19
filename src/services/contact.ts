import api from "../lib/axios";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export type ContactPayload = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

export async function sendContact(
  payload: ContactPayload
): Promise<{ success: boolean }> {
  const { data } = await api.post<{ success: boolean }>("/contact", payload);
  return data;
}

export function useSendContact() {
  return useMutation<{ success: boolean }, AxiosError, ContactPayload>({
    mutationFn: sendContact,
  });
}
