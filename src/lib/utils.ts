import { OrderStatusType } from "@/types/types";
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

type OrderStatusInfo = {
  label: string;
  value: OrderStatusType;
  progressValue: number;
};

export const ORDER_STATUS: OrderStatusInfo[] = [
  { label: "Placed", value: "placed", progressValue: 5 },
  {
    label: "Awaiting Restaurant Confirmation",
    value: "paid",
    progressValue: 25,
  },
  { label: "In Progress", value: "inProgress", progressValue: 50 },
  { label: "Out for Delivery", value: "outForDelivery", progressValue: 75 },
  { label: "Delivered", value: "delivered", progressValue: 100 },
];
