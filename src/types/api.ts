/***** Gerais *****/
export type CatchError = {
	response: ErrorResponse;
	message: string;
};

type ErrorResponse = {
	type: string;
	title: string;
	status: number;
	traceId: string;
};
