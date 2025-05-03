import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const wait = (time: number = 10000) =>
  new Promise((res) => setTimeout(res, time));
