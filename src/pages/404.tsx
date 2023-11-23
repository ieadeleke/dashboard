import LaswaLogo from '@/assets/icons/ic_logo.svg'
import Button from '@/components/buttons'
import Link from 'next/link'

export default function Laswa404Page() {
    return <div className="max-w-screen min-h-screen bg-[#4EBCF9] flex flex-col justify-center items-center overflow-x-hidden px-2">

        <div className="flex flex-col gap-4 text-white text-center py-8">
            <LaswaLogo className="self-center" />
            <h1 className="font-bold text-3xl">404 Error</h1>
            <p>{"We can’t seem to find the page you are looking for."}</p>
            <img src="https://res.cloudinary.com/dfzhxlgll/image/upload/v1700727499/laswa/404_image_qde6db.png" className="w-[300px] self-center object-contain object-center" />

            <Link href="/">
                <Button className="w-full bg-white text-primary rounded-lg font-semibold hover:bg-gray-100" variant="contained">Go Home</Button>
            </Link>
        </div>
    </div>
}