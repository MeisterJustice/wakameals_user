import {
	USER_SIGNIN_REQUEST,
	USER_SIGNIN_SUCCESS,
	USER_SIGNIN_FAIL,
	// USER_LOGOUT,
} from "./types"
import axios from "axios";


//USER SIGNIN ACTION PAYLOAD
export const signin = (identifier, password) => async (dispatch) => {
	dispatch({ type: USER_SIGNIN_REQUEST, payload: { identifier, password } });
	try {
		const { data } = await axios.post(
			"https://server.wakameals.validprofits.xyz/api/auth/login/default",
			{
				identifier,
				password
			}
		);
		const token = data.token;
		if (token) {
			dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
			localStorage.setItem("token", JSON.stringify(data.token));

		} else {

			dispatch({ type: USER_SIGNIN_FAIL, payload: data.errors });
		}
	} catch (error) {
		dispatch({ type: USER_SIGNIN_FAIL, payload: error.response ? error.response.data : "something went wrong" });
	}
};

export const signup = (formData) => async (dispatch) => {
	dispatch({ type: USER_SIGNIN_REQUEST, payload:  formData });
	try {
		const { data } = await axios.post(
			"https://server.wakameals.validprofits.xyz/api/auth/register/default",
			formData
		);
		const token = data.token;
		if (token) {
			dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
			localStorage.setItem("token", JSON.stringify(data.token));

		} else {

			dispatch({ type: USER_SIGNIN_FAIL, payload: data.errors });
		}
	} catch (error) {
		dispatch({ type: USER_SIGNIN_FAIL, payload: error.response ? error.response.data : "something went wrong" });
	}
};
