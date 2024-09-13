import { usePathname } from "next/navigation";
import Link from "next/link";
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
import { Input } from "../ui/input";
import { Label } from "../ui/label";

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
  const pathName = usePathname();

  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger asChild>
          {isAuthenticated ? (
            <Button disabled={disabled} className="w-full">
              Go to Checkout
            </Button>
          ) : (
            <Button className="w-full">
              <Link href={`/login?callbackurl=${pathName}`}>
                Login to continue
              </Link>
            </Button>
          )}
        </DialogTrigger>

        {isAuthenticated && (
          <DialogContent className="sm:max-w-[500px] md:min-w-[720px] lg:min-w-[850px]">
            <DialogHeader>
              <DialogTitle>Confirm Delivery Details</DialogTitle>
              <DialogDescription>
                View and change your delivery details here.
              </DialogDescription>
              <div className="mt-10 flex items-center justify-start gap-2">
                <div className="h-5 w-5 rounded-full bg-primary" />
                <Label className="text-black">Cash on delivery</Label>
              </div>
            </DialogHeader>
            <ProfileForm
              onSubmitAction={handleCheckOut}
              buttonText="Continue to Payment"
              isLoading={isPlacingOrderLoading}
            />
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default CheckoutButton;
