import { create } from 'zustand';

interface iAthlete {
  id: string;
  name: string;
  age: number;
  level: string;
};

interface iSession  {
  id: string;
  title: string;
  date: string;
  athleteIds: string[];
};

interface iUser{
  id: string;
  role: 'admin' | 'swimmer' | "coach";
  email:string;
  name: string;
  bearer: string | null;
}


interface AppState {
  user: iUser | null,
  athletes: iAthlete[];
  sessions: iSession[];
  setUser: (user: iUser | null) => void;
  
  setAthletes: (athletes:iAthlete[]) => void;
}

export const useSwimStore = create<AppState>((set) => ({
  user: null,
  athletes: [],
  sessions: [],
  setUser: (user) => set({ user }),
  setAthletes: (athletes) => set({athletes}),
 
}));