import React from "react";
import OrderStatusHeader from "./OrderStatusHeader";
import { OrderStatusApiResponseType } from "@/types/types";
import OrderStatusDetail from "./OrderStatusDetails";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";

type OrderStatusCardProps = {
  order: OrderStatusApiResponseType;
};

const OrderStatusCard = ({ order }: OrderStatusCardProps) => {
  return (
    <div className="space-y-14 rounded-lg bg-gray-100 p-10">
      <OrderStatusHeader order={order} />
      <div className="grid gap-10 md:grid-cols-2">
        <OrderStatusDetail order={order} />
        <AspectRatio ratio={16 / 5}>
          <Image
            fill
            src={order.restaurant.coverImage}
            className="h-full w-full rounded-md object-cover"
            alt="Cover Image"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </AspectRatio>
      </div>
    </div>
  );
};

export default OrderStatusCard;
