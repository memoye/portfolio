import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function divideIntoSections(arr: Array<any>, sectionSize = 5) {
  const sections = [];
  for (let i = 0; i < arr.length; i += sectionSize) {
    sections.push(arr.slice(i, i + sectionSize));
  }
  return sections;
}

export const isBrowser = () => typeof window !== "undefined";

export function scrollToTop() {
  if (!isBrowser()) return;
  window.scrollTo({ top: 0, behavior: "smooth" });
}
