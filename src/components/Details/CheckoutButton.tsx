import ProfileForm from "@/forms/my-user-forms/ProfileForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { UserProfileSchemaType } from "@/schemas/UserProfileSchema";
import { usePlaceOrder } from "@/hooks/OrderApi";
import { OrderDetailsType } from "@/types/types";

type CheckOutButtonProps = {
  handleCheckOut: (data: UserProfileSchemaType) => void;
  disabled: boolean;
  isPlacingOrderLoading: boolean;
};

const CheckoutButton = ({
  handleCheckOut,
  disabled,
  isPlacingOrderLoading,
}: CheckOutButtonProps) => {
  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button disabled={disabled} className="w-full">
            Go to Checkout
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[500px] md:min-w-[720px] lg:min-w-[850px]">
          <DialogHeader>
            <DialogTitle>Confirm Delivery Details</DialogTitle>
            <DialogDescription>
              View and change your delivery details here.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm
            onSubmitAction={handleCheckOut}
            buttonText="Continue to Payment"
            isLoading={isPlacingOrderLoading}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutButton;
