import { getAxiosClient } from '../../helpers/api';
import { vendorCreateSlice } from './registerSlice';

export const { request, error, success, reset } = vendorCreateSlice.actions;

export const registration = (values) => async (dispatch) => {
  try {
    dispatch(request());
    const axiosClient = getAxiosClient();
    const response = await axiosClient.post('register', values);
    const data = response.data;
    dispatch(success(data));
  } catch (e) {
    const errMsg =
      e.response && e.response.data.message
        ? e.response.data.message
        : e.message;
    const errStatus =
      e.response && e.response.data.message
        ? e.response.status
        : 500;
    return dispatch(error({ status: errStatus, message: errMsg }));
  }

};
