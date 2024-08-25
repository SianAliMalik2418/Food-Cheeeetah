import { MenuItemType } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CirclePlus } from "lucide-react";

type Props = {
  menuItem: MenuItemType;
  addToCart: () => void;
};

const MenuItem = ({ menuItem, addToCart }: Props) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <CardTitle className="text-xl">{menuItem.menuItemName}</CardTitle>
          <CirclePlus
            size={20}
            className="cursor-pointer text-primary"
            onClick={addToCart}
          />
        </div>
      </CardHeader>
      <CardContent className="font-medium">
        Rs. {menuItem.menuItemPrice}
      </CardContent>
    </Card>
  );
};

export default MenuItem;
