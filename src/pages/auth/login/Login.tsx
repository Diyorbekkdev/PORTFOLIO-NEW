import { useState } from "react";
import { useAuth } from "../../../states/auth";
import { useNavigate } from "react-router-dom";

import gif from "../../../assets/login.gif";
import hide from "../../../assets/hide.png";
import show from "../../../assets/show.png";
import "./login.scss";
import Loading from "../../../components/authLoading/Loading";
const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userForm, setUserForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const auth = useAuth(); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await auth.login(userForm, navigate); 
      setLoading(false)
    } catch (err) {
      console.log(err);
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  if(loading){
    return (
        <div className="loader">
            <Loading/>
        </div>
    )
  }
  return (
    <main className="main">
      <section className="section-login">
        <div className="section-main">
          <div className="section-login-1">
            <div className="section-login-1-main">
              <h1 className="section-login-1-title">Build Your Resume</h1>
              <p className="section-login-1-text">
                Login now and build your awesome resume
              </p>
              <div className="section-login-1-img">
                <img src={gif} alt="" />
              </div>
            </div>
          </div>
          <div className="section-login-2">
            <div className="section-login-2-main">
              <h1 className="section-login-2-title">Login </h1>
              <form className="section-login-2-form" onSubmit={handleLogin}>
                <div className="login-form-1">
                  <label htmlFor="input-username">Username</label>
                  <input
                    type="text"
                    onChange={handeChange}
                    name="username"
                    id="username"
                    placeholder="Username"
                    required
                  />
                </div>
                <div className="login-form-3">
                  <label htmlFor="input-password">Password</label>
                  <div className="password-input-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Password"
                      required
                      onChange={handeChange}
                    />
                    <button
                      type="button"
                      className="password-toggle-button"
                      onClick={handlePasswordToggle}
                    >
                      {showPassword ? (
                        <img src={hide} alt="" />
                      ) : (
                        <img src={show} alt="" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="login-form-4">
                  <input type="checkbox" id="input-checkbox" />
                  <p>
                    By creating an account, you agree to the{" "}
                    <a href="#">Terms & Conditions.</a>
                  </p>
                </div>
                <div className="login-form-submit-btn">
                  <button type="submit">Login In</button>
                </div>
                <div className="login-form-5">
                  <p>
                    If you don't have account? <a href="/register">Register</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
