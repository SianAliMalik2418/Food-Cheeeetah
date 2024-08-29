import { ORDER_STATUS } from "@/lib/utils";
import { OrderStatusApiResponseType } from "@/types/types";
import { Progress } from "../ui/progress";

type OrderStatusCardProps = {
  order: OrderStatusApiResponseType;
};

const OrderStatusHeader = ({ order }: OrderStatusCardProps) => {
  const expectedDeliveryTime = () => {
    const orderCreationTime = new Date(order.createdAt);

    // Add the estimated delivery time to the order creation time
    orderCreationTime.setMinutes(
      orderCreationTime.getMinutes() + order.restaurant.estimatedDeliveryTime,
    );

    let hours = orderCreationTime.getHours();
    const minutes = orderCreationTime.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert 24-hour time to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes} ${ampm}`;
  };

  const getOrderStatusInfo = () => {
    return (
      ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
    );
  };

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex w-full flex-col items-center md:flex-row md:justify-between">
        <h1 className="text-xl font-bold md:text-2xl">
          Order Status : {getOrderStatusInfo().label}
        </h1>
        <h1 className="text-xl font-semibold">
          Expected By : {expectedDeliveryTime()}
        </h1>
      </div>
      <Progress
        className="animate-pulse"
        value={getOrderStatusInfo().progressValue}
      />
    </div>
  );
};

export default OrderStatusHeader;
