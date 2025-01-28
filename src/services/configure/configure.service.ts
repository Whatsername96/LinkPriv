import { api } from "@/api/axiosConfig";

const CONFIGURE_URL = "/Mobiles/configure";

export type ConfigureServiceParams = {
	GeneratedPix: boolean;
	ApprovedPix: boolean;
	TransferredTransfer: boolean;
	News: boolean;
};

export async function getConfigureService() {
	const res = await api.get(CONFIGURE_URL);
	return res.data;
}

export async function putConfigureService({
	ApprovedPix,
	GeneratedPix,
	News,
	TransferredTransfer,
}: ConfigureServiceParams) {
	const res = await api.put(
		`${CONFIGURE_URL}?ApprovedPix=${ApprovedPix.toString()}&GeneratedPix=${GeneratedPix.toString()}&News=${News.toString()}&TransferredTransfer=${TransferredTransfer.toString()}`
	);
	return res.data;
}
