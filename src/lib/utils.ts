import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CUISINES_ITEMS = [
  "Pizza",
  "BBQ",
  "Desi",
  "Café",
  "Sushi",
  "Burger",
  "Noodles",
  "Steakhouse",
  "Seafood",
  "Bakery",
  "Mexican",
  "Chineese",
  "Organic",
  "Healthy Food",
];

export const SORT_OPTIONS = [
  "Relevance",
  "Fastest Delivery Time",
  "Delivery Price",
];
