import {create} from "zustand";
import { request } from "../request";
import { UserData } from "../types";

const obj ={
  birthday: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  address: "",
  email: "",
  info: "",
}
interface UserDataStore {
userData: UserData;
    fetchUserData: () => Promise<void>;
  }
const useUserDataStore = create<UserDataStore>((set) => ({
    userData: obj,
    fetchUserData: async () => {
      try {
        const response = await request.get("auth/me");
        set({ userData: response.data });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
  }));
  
  export default useUserDataStore;


  
  