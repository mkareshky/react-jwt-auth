import { loginSlice } from './loginSlice';
import { setToken, removeToken } from '../../helpers/auth';
import { getAxiosClient } from '../../helpers/api';

export const { request, error, success, reset } = loginSlice.actions;

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(request());
    const axiosClient = getAxiosClient();
    const response = await axiosClient.post('login', { email, password });
    const data = response.data;
    dispatch(success(data));
    if (data.result === true) {
      setToken(data.token);
    }
  } catch (e) {
    const errMsg =
      e?.response && e?.response?.data?.message
        ? e?.response?.data?.message
        : e?.message;
    const errStatus =
      e?.response && e?.response?.data?.message
        ? e?.response?.status
        : 500;
    return dispatch(error({ status: errStatus, message: errMsg }));
  }

};

export const signOut = (dispatch) => {
  dispatch(reset());
  removeToken();
}