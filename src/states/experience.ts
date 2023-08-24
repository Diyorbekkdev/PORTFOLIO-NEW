import { create } from 'zustand';
import { request } from '../request';
import Cookies from "js-cookie";
import { USERID } from '../constants';

const userId = Cookies.get(USERID);

type Experience = {
  _id: string;
  workName: string;
  companyName: string;
  description: string;
  startDate: string;
  endDate: string;
};

type ExperiencesStore = {
  experiences: Experience[];
  currentPage: number;
  totalPages: number;
  fetchExperiences: () => Promise<void>;
};

const useExperiencesStore = create<ExperiencesStore>((set) => ({
  experiences: [],
  currentPage: 1,
  totalPages: 1,
  fetchExperiences: async () => {
    try {
      const response = await request.get(
        `experiences?user=${userId}&limit=20`
      );
      
      set({
        experiences: response.data.data,
        currentPage: response.data.pagination.currentPage,
        totalPages: response.data.pagination.total / 5,
      });
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  },
 
}));

export default useExperiencesStore;
