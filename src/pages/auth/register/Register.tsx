import { useState } from "react";

import register from "../../../assets/registerflow_v1r1.gif";
import hide from "../../../assets/hide.png";
import show from "../../../assets/show.png";
import { useAuth } from "../../../states/auth";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/authLoading/Loading";
const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  
  
  const auth = useAuth();
  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await auth.register(userForm, navigate);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
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
          <div className="section-login-1 for_register">
            <div className="section-login-1-main">
              <h1 className="section-login-1-title register_title">
                Registeration
              </h1>
              <p className="section-login-1-text register_info">
                Create your account and build awesome <span>Portfolio!</span>
              </p>
              <div className="section-login-1-img ">
                <img src={register} alt="" />
              </div>
            </div>
          </div>
          <div className="section-login-2">
            <div className="section-login-2-main">
              <h1 className="section-login-2-title">Register </h1>
              <form className="section-login-2-form" onSubmit={handleLogin}>
                <div className="login-form-1">
                  <label htmlFor="input-firstname">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Username"
                    required
                    onChange={handeChange}
                  />
                </div>
                <div className="login-form-1">
                  <label htmlFor="input-lastName">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Username"
                    required
                    onChange={handeChange}
                  />
                </div>
                <div className="login-form-1">
                  <label htmlFor="input-username">Username</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    required
                    onChange={handeChange}
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
                  <button type="submit">Register</button>
                </div>
                <div className="login-form-5">
                  <p>
                    Already have an account? <a href="/login">Log In</a>
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

export default Register;
