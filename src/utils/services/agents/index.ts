import { request } from "../../request";
import { AddAgentParams, AddAgentResponse, FreezeAgentParam, FreezeAgentResponse, GetAllAgentsParams, GetAllAgentsResponse, SuspendAgentParams, SuspendAgentResponse } from "./types";

export function AgentService() {
    async function getAllAgents(payload: GetAllAgentsParams) {
        const data = await request({
            path: `v1/agent/admin/GetAgents?page=${payload.page ?? 1}`,
            method: "GET",
            body: payload,
        });
        return data as GetAllAgentsResponse;
    }

    async function addNewAgent(payload: AddAgentParams) {
        const data = await request({
            path: `v1/agent/admin/AddAgent`,
            method: "POST",
            body: payload,
        });
        return data as AddAgentResponse;
    }

    async function SuspendAgent(payload: SuspendAgentParams) {
        const data = await request({
            path: `v1/agent/admin/SuspendAgent`,
            method: "POST",
            body: payload,
        });
        return data as SuspendAgentResponse;
    }

    async function UnSuspendAgent(payload: SuspendAgentParams) {
        const data = await request({
            path: `v1/agent/admin/UnSuspendAgent`,
            method: "POST",
            body: payload,
        });
        return data as SuspendAgentResponse;
    }

    async function FreezeAgent(payload: FreezeAgentParam) {
        const data = await request({
            path: `v1/agent/admin/FreezeCustomerWallet`,
            method: "POST",
            body: payload,
        });
        return data as FreezeAgentResponse;
    }

    async function UnFreezeAgent(payload: FreezeAgentParam) {
        const data = await request({
            path: `v1/agent/admin/UnfreezeCustomerWallet`,
            method: "POST",
            body: payload,
        });
        return data as FreezeAgentResponse;
    }

    return {
        getAllAgents,
        addNewAgent,
        SuspendAgent,
        UnSuspendAgent,
        FreezeAgent,
        UnFreezeAgent
    };
}
