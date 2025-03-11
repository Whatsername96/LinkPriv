/***** Login *****/

export type LoginResponse = {
	authToken: string;
	needsAdditionalInfo: boolean;
	email: string;
	firstName: string;
	isVerified: boolean;
	slug: string;
	profileImage: string;
	isAgency: boolean;
};

/***** Configure *****/

export type ConfigureResponse = {
	notifyApprovedPix: boolean;
	notifyGeneratedPix: boolean;
	notifyTransferredTransfer: boolean;
	notifyNews: boolean;
};

/***** Transfers *****/

export enum WithdrawStatus {
	Pending = 0,
	Transfered = 1,
	Failed = 2,
	Processing = 3,
}

type Bank = {
	name: string;
	code: string;
};

export type BankAccount = {
	id: number;
	bankId: number;
	agency: string;
	agencyCheckDigit: number | null;
	account: string;
	accountCheckDigit: number;
	status: WithdrawStatus;
	pixKey: string;
	legalName: string;
	bank: Bank;
};

export type Transfer = {
	bankName: string;
	amount: number;
	status: number;
};

export type TransferByDate = {
	date: string;
	transfers: Transfer[];
};

export type TransfersResponse = {
	availableAmount: number;
	bankAccounts: BankAccount[];
	transferFee: number;
	transfers: TransferByDate[];
};

/***** Transactions *****/

export enum TransactionStatus {
	Paid = 3,
	Refunded = 4,
	WaitingPayment = 5,
}

export type LastTransactionResponse = {
	dateCreated: string;
	buyerName: string;
	buyerEmail: string;
	sellerAmount: number;
	productName: string;
	status: TransactionStatus;
	isReferal: boolean;
	tag: number;
	giftMessage: string;
	publicAccessId: string;
};

export type Transaction = {
	sellerAmount: number;
	buyerName: string;
	buyerEmail: string;
	productName: string;
	status: TransactionStatus;
};

export type TransactionByDateResponse = {
	date: string;
	transactions: Transaction[];
};

/**** Chart *****/
export type DataChart = {
	amount: number;
	count: number;
	date: string;
};

export type ChartInfoResponse = {
	chart: DataChart[];
	transferredAmount: number;
	paidAmount: number;
	availableAmount: number;
};
