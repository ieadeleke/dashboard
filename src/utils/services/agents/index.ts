import { request } from "../../request";
import {
    AddAgentParams, AddAgentResponse, FreezeAgentParam, FreezeAgentResponse, FundWalletParams,
    FundWalletResponse, GetAllAgentsParams, GetAllAgentsResponse, SuspendAgentParams, SuspendAgentResponse,
    UpdateWalletParams, UpdateWalletResponse
} from "./types";

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

    async function fundWallet(payload: FundWalletParams) {
        const data = await request({
            path: `v1/agent/admin/FundCustomerWallet`,
            method: "POST",
            body: payload,
        });
        return data as FundWalletResponse;
    }

    async function upgradeWallet(payload: UpdateWalletParams) {
        const data = await request({
            path: `v1/agent/admin/UpgradeWallet`,
            method: "PUT",
            body: payload,
        });
        return data as UpdateWalletResponse;
    }

    return {
        getAllAgents,
        addNewAgent,
        SuspendAgent,
        UnSuspendAgent,
        FreezeAgent,
        UnFreezeAgent,
        fundWallet,
        upgradeWallet
    };
}
