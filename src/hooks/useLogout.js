// library imports
import { toast } from "react-toastify";

// react imports
import useRefreshToken from "../hooks/useRefresh";

// redux import
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useSelector, useDispatch } from "react-redux";

const useLogout = () => {
  const refreshTokenHandler = useRefreshToken();
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();
  const { token, refreshToken, expDate } = useSelector((state) => state.auth);
  const logoutHandler = async () => {
    try {
      await refreshTokenHandler();
      const res = await logoutApiCall({
        data: {
          token: "<string>",
          refreshToken,
          error: "<string>",
          expiredate: expDate,
        },
        token,
      });
      dispatch(logout());
      toast.success(res.data.message, {
        autoClose: 2000,
        style: {
          fontSize: "18px",
        },
      });
    } catch (err) {
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
        style: {
          fontSize: "18px",
        },
      });
    }
  };

  return logoutHandler;
};

export default useLogout;
