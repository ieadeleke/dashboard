import { request } from "../../request";
import { AllowMDAsParams, AllowMDAsResponse, ApproveMDAResponse, ApproveMDAsParams, DisableMDAsParams, DisableMDAsResponse, GetAllMDAsParams, GetAllMDAsResponse } from "./types";

export function MDAService() {
  async function getAllMDAs(payload: GetAllMDAsParams) {
    const data = await request({
      path: `v1/mdaConsultant/GetAllMDAWithConsultant?page=${payload.page ?? 1}`,
      method: "GET",
      body: payload,
    });
    return data as GetAllMDAsResponse;
  }

  async function allowMDAConsultantSplitting(payload: AllowMDAsParams) {
    const data = await request({
      path: `v1/mdaConsultant/AllowMDASplitting`,
      method: "PUT",
      body: payload,
    });
    return data as AllowMDAsResponse;
  }

  async function approveMDAConsultant(payload: ApproveMDAsParams) {
    console.log(payload);
    console.log("hello there");
    const data = await request({
      path: `v1/mdaConsultant/ApprovedMDAConsultant`,
      method: "PUT",
      body: payload,
    });
    return data as ApproveMDAResponse;
  }

  async function disableMDAConsultantSplitting(payload: DisableMDAsParams) {
    const data = await request({
      path: `v1/mdaConsultant/DisableMDASplitting`,
      method: "PUT",
      body: payload,
    });
    return data as DisableMDAsResponse;
  }


  return {
    getAllMDAs,
    disableMDAConsultantSplitting,
    approveMDAConsultant,
    allowMDAConsultantSplitting
  };
}
