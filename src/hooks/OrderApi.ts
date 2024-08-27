import { OrderDetailsType, OrderStatusApiResponseType } from "@/types/types";
import axios from "axios";
import { useMutation, useQuery } from "react-query";

export const usePlaceOrder = () => {
  const placeOrderRequest = async (orderDetails: OrderDetailsType) => {
    try {
      const response = await axios.post(
        `/api/order?restaurant=${orderDetails.restaurant}&user=${orderDetails.user}`,
        orderDetails,
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const { mutateAsync: placeOrder, isLoading } = useMutation(placeOrderRequest);

  return { isLoading, placeOrder };
};

export const useGetMyOrders = (userId: string) => {
  const getMyOrdersRequest = async (): Promise<
    OrderStatusApiResponseType[]
  > => {
    try {
      const response = await axios.get(`/api/order?userId=${userId}`);
      console.log(response);
      return response.data.orders;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  };

  const { data: orders, isLoading } = useQuery(
    "getMyOrders",
    getMyOrdersRequest,
    {
      enabled: !!userId,
    },
  );

  return { orders, isLoading };
};
