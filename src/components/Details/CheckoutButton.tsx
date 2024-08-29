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
import Link from "next/link";

type CheckOutButtonProps = {
  handleCheckOut: (data: UserProfileSchemaType) => void;
  disabled: boolean;
  isPlacingOrderLoading: boolean;
  isAuthenticated: boolean | undefined;
};

const CheckoutButton = ({
  handleCheckOut,
  disabled,
  isPlacingOrderLoading,
  isAuthenticated,
}: CheckOutButtonProps) => {
  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button disabled={disabled} className="w-full">
            {isAuthenticated ? (
              "Go to Checkout"
            ) : (
              <Link href={"/login"}>Login to continue</Link>
            )}
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
