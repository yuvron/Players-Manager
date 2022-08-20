import { AxiosError } from "axios";

export const errorHandler = (err: AxiosError) => {
	if (err.response && err.response.status === 500) location.reload();
	else console.log(err);
};
