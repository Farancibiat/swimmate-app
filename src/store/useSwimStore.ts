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
  name: string;
  bearer: string | null;
}
type NullUser= iUser | null;

interface AppState {
  user: NullUser;
  athletes: iAthlete[];
  sessions: iSession[];
  setUser: (user: iUser) => void;
  setAthletes: (athletes:iAthlete[]) => void;
}

export const useSwimStore = create<AppState>((set) => ({
  user:null,
  athletes: [],
  sessions: [],
  
  setUser: (user) =>set({user}),
  setAthletes: (athletes) => set({athletes}),
 
}));