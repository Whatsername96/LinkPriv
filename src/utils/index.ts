import { colors } from "@/constants/styles";
import { WithdrawStatus, TransactionStatus, DataChart } from "@/types/backend";
import moment, { Moment } from "moment";

export function dateFormatToChart(date: string | Moment) {
	return moment(date).format("DD MMM");
}

export function getWithdrawStatusTranslation(status: WithdrawStatus): string {
	const withdrawStatus = {
		[WithdrawStatus.Pending]: "Pendente",
		[WithdrawStatus.Transfered]: "Sucesso",
		[WithdrawStatus.Failed]: "Falha na transferência",
		[WithdrawStatus.Processing]: "Processando",
	};
	return withdrawStatus[status];
}

export function getWithdrawStatusColor(status: WithdrawStatus): string {
	const withdrawStatus = {
		[WithdrawStatus.Pending]: colors.orange_100,
		[WithdrawStatus.Transfered]: colors.green_1_100,
		[WithdrawStatus.Failed]: colors.green_2_100,
		[WithdrawStatus.Processing]: colors.blue_2_100,
	};
	return withdrawStatus[status];
}

export function getTransactionStatusTranslation(
	status: TransactionStatus
): string {
	const transactionStatus = {
		[TransactionStatus.Paid]: "Aprovada",
		[TransactionStatus.WaitingPayment]: "Pendente",
		[TransactionStatus.Refunded]: "Reembolsada",
	};

	return transactionStatus[status] || "Desconhecido";
}

export function getTransactionStatusColor(status: TransactionStatus): string {
	const transactionStatusColors = {
		[TransactionStatus.Paid]: colors.green_1_100,
		[TransactionStatus.WaitingPayment]: colors.orange_100,
		[TransactionStatus.Refunded]: colors.red_1_100,
	};

	return transactionStatusColors[status] || colors.gray_1_100;
}

export function getDescribedRelativeDate(date: string) {
	const diff = moment(new Date(), "YYYY-MM-DD").diff(
		moment(date, "YYYY-MM-DD"),
		"days"
	);
	if (diff === 0) {
		return "Hoje";
	}
	if (diff === 1) {
		return "Ontem";
	}
	if (diff > 0) {
		return moment(date).format("DD/MM/YYYY");
	}
}
