type WalletType = {
    accountName: string;
    accountNumber: string;
    bankName: string;
    phoneNumber: string;
    email: string;
    tier: string;
    type: string;
    maxBalance: number;
    dailyTransactionLimit: number;
}

export type AllAgentType = {
    _id: string;
    firstName: string;
    lastName: string;
    name: string,
    email: string,
    phoneNumber: string,
    createdAt: string,
    wallet?: WalletType,
    ConsultantCompany?: {
        name?: string
    }
}