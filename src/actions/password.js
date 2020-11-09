import PasswordService from "../services/password.service";
import {
    FORGOT_FAIL,
    FORGOT_SUCCESS,
    RESET_SUCCESS,
    RESET_FAIL,
    VERIFY_FAIL,
    VERIFY_SUCCESS,
    SET_MESSAGE
} from "./types";

export const forgot = (email) => (dispatch) => {
    return PasswordService.forgot(email).then(
        () => {
            dispatch({
                type: FORGOT_SUCCESS,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: FORGOT_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const verify = (email, token) => (dispatch) => {
    return PasswordService.verify(email, token).then(
        () => {
            dispatch({
                type: VERIFY_SUCCESS,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: VERIFY_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const reset = (email, token, password) => (dispatch) => {
    return PasswordService.reset(email, token, password).then(
        () => {
            dispatch({
                type: RESET_SUCCESS,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: RESET_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};