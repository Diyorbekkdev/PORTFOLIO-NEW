import {create} from 'zustand';
import { request } from '../request';
import Cookies from "js-cookie";
import { USERID } from '../constants';
const userId = Cookies.get(USERID);
type Skill = {
  _id: string;
  name: string;
  percent: number;
};

type SkillsStore = {
  skills: Skill[];
  currentPage: number;
  totalPages: number;
  fetchSkills: () => Promise<void>;
};

const useSkillsStore = create<SkillsStore>((set) => ({
  skills: [],
  currentPage: 1,
  totalPages: 1,
  fetchSkills: async () => {
    try {
      const response = await request.get(
        `skills?user=${userId}&limit=${20}`
      );
      const skillsPerPage = 5; 
      const totalPages = Math.ceil(response.data.pagination.total / skillsPerPage);
      set({ skills: response.data.data,
        currentPage: response.data.pagination.currentPage,
        totalPages: totalPages,
     });
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  },
}));

export default useSkillsStore;
