
import {
	USER_SIGNIN_REQUEST,
	USER_SIGNIN_SUCCESS,
	USER_SIGNIN_FAIL,
	USER_LOGOUT,
	DONE,
	REFRESH
} from "./types"

//REDUCER FOR USER SINGNIN
export const userSigninReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_SIGNIN_REQUEST:
			return {
				loading: true
			};
		case USER_SIGNIN_SUCCESS:
			return {
				loading: false,
				user: action.payload
			};
		case USER_SIGNIN_FAIL:
			return {
				loading: false,
				error: action.payload
			};
		case USER_LOGOUT:
			return {
				user: {}
			};
		default:
			return state;
	}
};

export const done = (state = false, action) => {
	switch (action.type){
		case DONE:
			return {
				done: true
			}
		case REFRESH:
			return {
				done: false
			}
		default:
			return state;
	}
}