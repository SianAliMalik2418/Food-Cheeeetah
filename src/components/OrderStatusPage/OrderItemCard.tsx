import { OrderStatusApiResponseType, OrderStatusType } from "@/types/types";
import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { useUpdateMyRestaurantOrderStatus } from "@/hooks/MyRestaurantApi";
import { ORDER_STATUS } from "@/lib/utils";

type OrderItemCardProps = {
  order: OrderStatusApiResponseType;
  userId: string;
};

const OrderItemCard = ({ order, userId }: OrderItemCardProps) => {
  const { changeOrderStatus, isLoading } = useUpdateMyRestaurantOrderStatus();

  const getTime = () => {
    const orderDateTime = new Date(order.createdAt);

    const hours = orderDateTime.getHours();
    const minutes = orderDateTime.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  const [status, setStatus] = useState<OrderStatusType>(order.status);

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);

  const handleStatusChange = async (newStatus: OrderStatusType) => {
    await changeOrderStatus({
      orderId: order._id as string,
      userId: userId,
      orderStatus: newStatus,
    });
    setStatus(newStatus);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="mb-3 grid justify-between gap-4 text-lg md:grid-cols-4">
          <div>
            Customer Name:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.username}
            </span>
          </div>
          <div>
            Delivery address:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
            </span>
          </div>
          <div>
            Time:
            <span className="ml-2 font-normal">{getTime()}</span>
          </div>
          <div>
            Total Cost:
            <span className="ml-2 font-normal">Rs. {order.totalAmount}</span>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          {order.cartItems.map((cartItem) => (
            <span key={cartItem._id}>
              <Badge variant="outline" className="mr-2">
                {cartItem.quantity}
              </Badge>
              {cartItem.menuItemName}
            </span>
          ))}
        </div>
      </CardContent>

      <div className="my-7 flex flex-col space-y-2 px-8">
        <Label className="text-base font-medium">
          What is the status of this order?
        </Label>
        <Select
          value={status}
          disabled={isLoading}
          onValueChange={(value) =>
            handleStatusChange(value as OrderStatusType)
          }
        >
          <SelectTrigger id="status">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent position="popper">
            {ORDER_STATUS.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
};

export default OrderItemCard;
