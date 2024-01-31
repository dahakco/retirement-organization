// react imports
import { useEffect, useContext, useState } from "react";

// component imports
import Captcha from "../components/Captcha";

// rrd imports
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

// datab imports
import users from "../db/userdb";

// library imports
import { toast } from "react-toastify";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/solid";

function Login() {
  const { isCaptchaValid } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [psw, setPsw] = useState("");
  const [isCredentialsValid, setIsCredentialsValid] = useState(false);
  const navigate = useNavigate();

  const handleUserInput = (e) => {
    setUserName(e.target.value);
    validateCredentials(e.target.value, psw);
  };

  const handlePswInput = (e) => {
    setPsw(e.target.value);
    validateCredentials(userName, e.target.value);
  };

  const validateCredentials = (user, password) => {
    setIsCredentialsValid(false);

    for (let usr of users) {
      console.log(usr);
      if (password === usr.psw && user === usr.userName) {
        setIsCredentialsValid(true);
        return;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // user authentication logic
    if (isCaptchaValid && isCredentialsValid) {
      navigate("/retirement-organization/dashboard");
      toast.success("وارد شدید", {
        autoClose: 4000,
      });
    } else if (!isCaptchaValid) {
      toast.error("! کد امنیتی اشتباه است", {
        autoClose: 4000,
      });
    } else {
      toast.error("! اطلاعات ورود صحیح نیست", {
        autoClose: 4000,
      });
    }
  };

  const style = {
    position: "absolute",
    top: "18px",
    left: "25px",
  };

  useEffect(() => {
    const form = document.getElementById("form");
    form.addEventListener("mouseover", (e) => {
      const x = (window.innerWidth / 2 - e.pageX) / 35;
      const y = (window.innerHeight / 2 - e.pageY) / 35;

      form.style.transform = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
    });

    form.addEventListener("mouseleave", () => {
      form.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  }, []);

  return (
    <form className="loginContainer bg" onSubmit={handleSubmit} method="POST">
      <div className="loginContainer__box" id="form">
        <div className="loginContainer__box--header">
          <span>ورود به صفحه کاربری</span>
        </div>

        <div className="inputBox">
          <input
            type="text"
            id="user"
            className="input field"
            required
            onChange={handleUserInput}
          />
          <label htmlFor="user" className="label">
            نام کاربری
          </label>
          <UserIcon style={style} width={20} />
        </div>

        <div className="inputBox">
          <input
            type="password"
            id="pass"
            className="input field"
            required
            onChange={handlePswInput}
          />
          <label htmlFor="pass" className="label">
            کلمه عبور
          </label>
          <LockClosedIcon style={style} width={20} />
        </div>

        <div className="loginContainer__box--rememberForgot">
          <div className="loginContainer__box--rememberForgot--forgot">
            <a href="#">کلمه عبور را فراموش کرده اید ؟</a>
          </div>

          <div className="loginContainer__box--rememberForgot--remember">
            <label
              htmlFor="checkbox"
              className="loginContainer__box--rememberForgot--remember-label"
            >
              مرا به خاطر بسپار
            </label>
            <input type="checkbox" id="checkbox" />
          </div>
        </div>

        <div className="loginContainer__box--inputBox">
          <Captcha isCaptchaValid={isCaptchaValid} />
        </div>

        <div className="loginContainer__box--register">
          <button type="submit" className="btn--login">
            ورود
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;