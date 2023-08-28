import { useState } from "react";
import { getPasswordStrength } from "../../../data/passwordCheck";
import { request } from "../../../request";
import { toast } from "react-toastify";

const PasswordUpdate = () => {
  const objPassword = {
    username: "",
    currentPassword: "",
    newPassword: "",
  };
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(objPassword);
  const [passwordStrength, setPasswordStrength] = useState<
    "weak" | "medium" | "strong" | ""
  >("");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setNewPassword({ ...newPassword, [name]: value });
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newNewPassword = event.target.value;
    setNewPassword((prevState) => ({
      ...prevState,
      newPassword: newNewPassword
    }));
  
    if (newNewPassword === "") {
      setPasswordStrength("");
    } else {
      const strength = getPasswordStrength(newNewPassword);
      setPasswordStrength(strength);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await request.put("auth/updatepassword", newPassword);
      setNewPassword(objPassword);
    } catch (err) {
      toast.error('Error updating password')
    }
  };

  return (
    <div className="password_update">
      <h1>Update Password</h1>
      <form className="password__form" onSubmit={handleSubmit}>
        <div className="form__group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={newPassword.username}
            onChange={handleChange}
          />
        </div>
        <div className="form__group">
          <label htmlFor="password">Current Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="currentPassword"
            id="password"
            placeholder="Password"
            value={newPassword.currentPassword}
            onChange={handleChange}
          />
        </div>
        <div className="form__group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="newPassword"
            id="newPassword"
            placeholder="New Password"
            value={newPassword.newPassword}
            onChange={handlePasswordChange}
          />
          <button
            type="button"
            className="show-password-button"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          <div className="password-strength">
            <div className={`strength-indicator ${passwordStrength}`}></div>
            <span className="strength-label">{passwordStrength}</span>
          </div>
        </div>
        <div className="form__group">
          <button className="confirm_button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordUpdate;
