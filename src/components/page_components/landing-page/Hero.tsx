import Button from "@/components/buttons"

export const Hero = () => {
    return <div className="bg-black h-[550px]">

        <div className="px-[20%] pt-[10%] text-white text-center">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <h1 className="text-5xl font-bold">Experience Convenience at your Fingertips</h1>
                    <p className="text-xl">Experience hassle-free and affordable deliveries that keep you connected to what matters the most. </p>
                </div>

                <div className='flex items-center gap-8 justify-center'>
                    <Button className="px-8 text-black">Get Started</Button>
                    <Button variant="outlined">Become a Rider</Button>
                </div>
            </div>
        </div>
    </div>
}