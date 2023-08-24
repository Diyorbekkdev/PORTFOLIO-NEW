import { create } from 'zustand';
import { request } from '../request';
import Cookies from "js-cookie";
import { USERID } from '../constants';

const userId = Cookies.get(USERID);

type Education = {
  _id: string;
  name: string;
  level: string;
  description: string;  
  startDate: string;
  endDate: string;
};

type EducationStore = {
  education: Education[];
  currentPage: number;
  totalPages: number;
  fetchEducation: () => Promise<void>;
};

const useEducationStore = create<EducationStore>((set) => ({
  education: [],
  currentPage: 1,
  totalPages: 1,
  fetchEducation: async () => {
    try {
      const response = await request.get(
        `education?user=${userId}&limit=${30}`
      );
      
      set({
        education: response.data.data,
        currentPage: response.data.pagination.currentPage,
        totalPages: response.data.pagination.totalPages,
      });
    } catch (error) {
      console.error('Error fetching education:', error);
    }
  },

}));

export default useEducationStore;
