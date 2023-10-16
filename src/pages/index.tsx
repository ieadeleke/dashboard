import DashboardLayout from "@/components/layout/dashboard";
import { Activities } from "@/components/dashboard/Activities";
import { Fleets } from "@/components/dashboard/fleet/Fleets";
import { LifeTracking } from "@/components/dashboard/LifeTracking";
import { Stats } from "@/components/dashboard/stats/Stats";
import SEO from "@/components/SEO";
import { GetServerSideProps } from "next";
import { ActivitiesService } from "@/utils/services/activity";
import { GetDashboardStatistics } from "@/models/activities/ActivitiesResponse";
import { handleServerSideRedirect } from "@/utils/request/helpers/handleServerSideRedirect";

type HomeProps = {
  data: GetDashboardStatistics
}

export default function Home(props: HomeProps) {
  const { data } = props

  return (
    <DashboardLayout>
      <div className="flex flex-col py-8 gap-8">
        <SEO title="Laswa | Home" />
        <Stats data={data} />
        <Activities />
        <LifeTracking />
        <Fleets />
      </div>
    </DashboardLayout>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ req }) => {

  try {
    const data = await ActivitiesService({ req }).getDashboardStatistics()
    return {
      props: {
        data
      }
    }
  } catch (error) {
    return handleServerSideRedirect(error, () => {
      return {
        notFound: true
      }
    })
  }
}