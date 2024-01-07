import { Layout } from "@/components/layout";
import { EkoMileLogistics } from "@/components/page_components/landing-page/EkoMileLogistics";
import { Hero } from "@/components/page_components/landing-page/Hero";
import { HeroOptions } from "@/components/page_components/landing-page/HeroOptions";
import { OurServices } from "@/components/page_components/landing-page/our-services";

export default function HomePage() {
    return <Layout>
        <div className="flex flex-col gap-16 pb-16 bg-white">
            <Hero />
            <div className="-mt-32 z-10 px-32">
            <HeroOptions />
            </div>
            <OurServices />
            <EkoMileLogistics />
        </div>
    </Layout>
}