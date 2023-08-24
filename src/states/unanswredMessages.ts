import {create} from "zustand";
import { request } from "../request";

const useMessageStore = create((set) => ({
  unansweredMessages: [],
  fetchUnansweredMessages: async () => {
    try {
      const response = await request.get(
        "messages?answer"
      );
      set({ unansweredMessages: response.data });
    } catch (error) {
      console.error("Error fetching unanswered messages:", error);
    }
  },
}));

export default useMessageStore;
