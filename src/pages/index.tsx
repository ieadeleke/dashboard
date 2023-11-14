import DashboardLayout from "@/components/layout/dashboard";
import { Activities } from "@/components/dashboard/Activities";
import { Fleets } from "@/components/dashboard/fleet/Fleets";
import { LifeTracking } from "@/components/dashboard/LifeTracking";
import { Stats } from "@/components/dashboard/stats/Stats";
import SEO from "@/components/SEO";
import { GetServerSideProps } from "next";
import { ActivitiesService } from "@/utils/services/activity";
import { GetDashboardStatistics } from "@/models/activities/ActivitiesResponse";
import { errorHandler } from "@/utils/errorHandler";
import Unauthorized from "@/components/states/UnAuthorized";
import AuthToken from '@/utils/AuthToken'
import { useEffect } from "react";
import roundToNearestMinutes from "date-fns/esm/fp/roundToNearestMinutes/index.js";
import { useRouter } from "next/router";

type HomeProps = {
  data: GetDashboardStatistics,
  unauthorized?: boolean,
  redirect?: boolean
}

export default function Home(props: HomeProps) {
  const { data } = props
  const router = useRouter()

  // useEffect(() => {
  //   if(props.redirect){
  //     router
  //   }
  // })

  if (props.unauthorized) {
    return <DashboardLayout>
      <Unauthorized />
    </DashboardLayout>
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col py-8 gap-8">
        <SEO title="Laswa | Home" />
        <Stats data={data} />
        <Activities data={data.Trips} />
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
    const parsedError = errorHandler(error)
    const token = AuthToken().retrieveToken(req)
    if (parsedError.status == 401 && token) {
      return {
        redirect: {
          destination: '/login'
        },
        props: {

        }
      }
    } else if (parsedError.status == 403) {
      return {
        props: {
          unauthorized: true
        }
      }
    }
    throw error
  }
}