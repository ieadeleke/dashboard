import Button from "@/components/buttons";
import { Rating } from "@mui/material";
import { useState } from "react";

export const PackageDelivered = () => {
  const [rating, setRating] = useState(2);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-lg">Package Delivered</h1>

      <div className="flex flex-col justify-center items-center gap-2">
        <div className="w-96 bg-gray-100 h-[400px]" />
        <div className="flex flex-col gap-2 text-center">
          <h1 className="font-bold text-2xl">Item successfully received!</h1>
          <p className="text-primary">Please rate rider</p>

          <p>Your feedback would help us improve deliveries.</p>

          <Rating
            className="self-center"
            name="simple-controlled"
            value={rating}
            onChange={(_, newValue) => {
              setRating(newValue ?? 0);
            }}
          />
        </div>
      </div>

      <Button variant="contained">Submit</Button>
    </div>
  );
};
