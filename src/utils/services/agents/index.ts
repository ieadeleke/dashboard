import { request } from "../../request";
import {
    AddAgentParams, AddAgentResponse, AddNewConsultantParam, AddNewConsultantsResponse, FetchAgentTransactionsParams, FetchAgentTransactionsResponse, FetchAgentWalletParams, FetchAgentWalletResponse, FreezeAgentParam, FreezeAgentResponse, FundWalletParams,
    FundWalletResponse, GetAllAgentsLoanParams, GetAllAgentsParams, GetAllAgentsResponse, GetAllConsultantsResponse, SuspendAgentParams, SuspendAgentResponse,
    UpdateConsultantParam,
    UpdateConsultantsResponse,
    UpdateLoanStatusParam,
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

    async function getAllAgentsLoans(payload: GetAllAgentsLoanParams) {
        const data = await request({
            path: `v1/agent/loan/admin/viewloans?status=${payload.status}&page=${payload.page ?? 1}`,
            method: "GET",
            body: payload,
        });
        return data as any;
    }

    async function getAllConsultants() {
        const data = await request({
            path: `v1/agent/admin/GetAllAgentConsultantCompany`,
            method: "GET",
            body: "",
        });
        return data as GetAllConsultantsResponse;
    }

    async function saveNewConsultant(param: AddNewConsultantParam) {
        const data = await request({
            path: `v1/agent/admin/AddConsultantCompany`,
            method: "POST",
            body: param,
        });
        return data as AddNewConsultantsResponse;
    }

    async function approveAgentLoanRequest(param: UpdateLoanStatusParam) {
        const data = await request({
            path: `v1/agent/loan/admin/approveloan`,
            method: "PUT",
            body: param,
        });
        return data as any;
    }

    async function rejectAgentLoanRequest(param: UpdateLoanStatusParam) {
        const data = await request({
            path: `v1/agent/loan/admin/rejectloan`,
            method: "PUT",
            body: param,
        });
        return data as any;
    }

    async function updateAgentConsultant(param: UpdateConsultantParam) {
        const data = await request({
            path: `v1/agent/admin/UpdateAgentConsultantCompany`,
            method: "POST",
            body: param,
        });
        return data as UpdateConsultantsResponse;
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

    async function FetchAgentWallet(payload: FetchAgentWalletParams) {
        const data = await request({
            path: `v1/agent/admin/AdminViewWalletTransaction?page=${payload.page}`,
            method: "PUT",
            body: payload,
        });
        return data as FetchAgentWalletResponse;
    }

    async function FetchAgentTransactionHistory(payload: FetchAgentTransactionsParams) {
        const data = await request({
            path: `v1/agent/admin/AdminGetAgentTransactions?page=${payload.page}`,
            method: "PUT",
            body: payload,
        });
        return data as FetchAgentTransactionsResponse;
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
        upgradeWallet,
        FetchAgentWallet,
        FetchAgentTransactionHistory,
        getAllConsultants,
        saveNewConsultant,
        updateAgentConsultant,
        getAllAgentsLoans,
        rejectAgentLoanRequest,
        approveAgentLoanRequest
    };
}
