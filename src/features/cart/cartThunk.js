import { customFetch } from "../../utils/CustomFetch";
import { x_api_key, token } from "../../data";
const header = () => {
  return {
    "x-api-key": x_api_key,
  };
};

export const createOrderThunk = async (order, thunkAPI) => {
  try {
    const resp = await customFetch.post(`orders`, order, {
      headers: {
        ...header(),
        Authorization: thunkAPI.getState().user.user.IdToken,
      },
    });
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
