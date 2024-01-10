import { ArrowRight } from "lucide-react";

export const Testimonials = () => {
  return (
    <div className="grid grid-cols-1 px-3 md:grid-cols-[40%,60%] md:px-16">
      <div className="flex flex-col gap-10">
        <div className="flex items-center gap-4">
          <div className="w-20 h-[0.85px] bg-[#525596]" />
          <p className="text-[#525596]">TESTIMONIAL</p>
        </div>

        <div className="flex flex-col gap-3 text-[#696984]">
          <h1 className="text-4xl font-semibold text-[#2E2E2E]">
            What They Say?
          </h1>
          <p>
            Ekomile has got more than 100k positive ratings from our users
            around the world.{" "}
          </p>

          <p>Some users were greatly helped in making passive income.</p>
          <p>Are you too? Please give your assessment</p>
        </div>

        <div className="flex border border-primary rounded-full text-primary cursor-pointer">
          <p className="p-3">Write your assessment</p>
          <div className="flex-1" />

          <div className="text-primary border rounded-full border-primary p-3">
            <ArrowRight />
          </div>
        </div>
      </div>

      <div className="relative h-[600px] md:h-[400px]">
        <img
          className="w-full h-full object-contain object-cente"
          src="https://res.cloudinary.com/dfzhxlgll/image/upload/v1704801021/eko%20mile/woman_smiling_fw0sub.png"
        />
        <div className="bg-white absolute right-0 bottom-0 border-l-8 border-l-[#F67766] rounded-l-lg md:w-[300px] md:h-[200px] lg:md:w-[500px]">
          <p className="text-gray-500 p-4">
            EKOMILE provided exceptional service, managing my shipment with
            professionalism and ensuring timely delivery. Their commitment to
            customer satisfaction and effective communication made them a top
            choice for my logistics needs.
          </p>
        </div>
      </div>
    </div>
  );
};
