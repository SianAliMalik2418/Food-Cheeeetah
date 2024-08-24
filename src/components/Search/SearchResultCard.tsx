import { RestaurantType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { CiClock1 } from "react-icons/ci";
import { MdOutlineDeliveryDining } from "react-icons/md";
import PlaceHolderRestaurantImage from "../../../public/placeholder-restaurant.png";

const SearchResultCard = ({ restaurant }: { restaurant: RestaurantType }) => {
  // _id: new ObjectId('66835a173fcd766da4937d8a'),
  //   userId: new ObjectId('6680be2bd3a88a9a135eddc9'),
  //   restaurantName: 'Sheikh Chilli ',
  //   country: 'Pakistan',
  //   city: 'Lahore',
  //   coverImg: 'https://res.cloudinary.com/x-clone/image/upload/v1719884281/pj1iorlxeib9j7g3tdij.jpg',
  //   deliveryTime: 40,
  //   deliveryPrice: 50,
  //   cuisines: [ 'BBQ', 'Desi', 'Steakhouse', 'Healthy Food' ],
  //   menuItems: [ [Object], [Object], [Object] ],
  //   __v: 0

  return (
    <Link
      href={`/details/${restaurant._id}`}
      className="flex h-[18rem] w-[20rem] cursor-pointer flex-col gap-3 rounded-lg shadow-2xl transition-all hover:scale-[1.02] xl:mt-10 xl:w-[19rem]"
    >
      <div className="relative h-[60%] w-full overflow-hidden rounded-lg bg-indigo-600">
        <Image
          src={restaurant.coverImage || PlaceHolderRestaurantImage}
          alt="Cover Image"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-col px-3">
        <h1 className="truncate text-lg font-semibold">
          {restaurant.restaurantName}{" "}
        </h1>

        <span className="mt-2 text-sm">$$$ . {restaurant.city}</span>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex items-center gap-1">
            <CiClock1 className="font-bold text-yellow-500" />
            <span className="text-sm">
              {restaurant.estimatedDeliveryTime} -{" "}
              {restaurant.estimatedDeliveryTime + 20} mins
            </span>
          </div>

          <div className="flex items-center justify-center gap-1">
            <MdOutlineDeliveryDining className="h-full text-yellow-500" />
            <span className="text-sm">Rs. {restaurant.deliveryPrice}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default SearchResultCard;
