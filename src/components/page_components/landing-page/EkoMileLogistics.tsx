import Button from "@/components/buttons";

export const EkoMileLogistics = () => {
  return (
    <div className="flex flex-col items-center px-2 gap-8 md:px-48">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="font-bold text-primary text-2xl md:text-3xl">
          EkoMile Logistics
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Lorem ipsum dolor sit amet consectetur. Pulvinar et lobortis vivamus
          eu ac sed. Interdum mattis sed lectus vel vestibulum. Aliquet
          scelerisque purus vitae aliquam. In auctor felis arcu accumsan proin
          eros vitae morbi.
        </p>
      </div>

      <Button className="w-full rounded-2xl md:w-[300px]">Get Started</Button>
    </div>
  );
};
