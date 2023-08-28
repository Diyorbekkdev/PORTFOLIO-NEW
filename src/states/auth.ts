import { NavigateFunction } from "react-router-dom";
import { create } from "zustand";
import Cookies from "js-cookie";
import { userLogin, userRegister } from "../types";
import { TOKEN, USERID} from "../constants";
import { request } from "../request";



type AuthTypes = {
  isAuthenticated: boolean;
  login: (data: userLogin, navigate: NavigateFunction) => void;
  logout: () => void;
  register: (data: userRegister, navigate: NavigateFunction) => void;
  userId: string;
};

export const useAuth = create<AuthTypes>((set) => ({
  isAuthenticated: Cookies.get(TOKEN) ? true : false,
  userId : Cookies.get(USERID) || '',
  login: async (data, navigate) => {
    try {
      const res = await request.post("auth/login", data);
      Cookies.set(TOKEN, res.data.token);
      Cookies.set(USERID, res.data.user._id);
      set({ isAuthenticated: true, userId: res.data.user._id});
      navigate("/experience");
    } catch (err) {
      console.log(err)
    }
  },
  logout: () => {
    Cookies.remove(TOKEN);
    set({ isAuthenticated: false });
  },
  register: async (data, navigate) => {
    try {
      const res = await request.post("auth/register", data); 
      Cookies.set(TOKEN, res.data.token);
      set({ isAuthenticated: true });
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  },
}));
