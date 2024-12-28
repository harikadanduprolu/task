import { create } from 'zustand';
import type { Team } from '../types';
import { getTeams, createTeam, updateTeam } from '../lib/api';

interface TeamState {
  teams: Team[];
  loading: boolean;
  error: Error | null;
  fetchTeams: () => Promise<void>;
  addTeam: (team: Omit<Team, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateTeam: (id: string, updates: Partial<Team>) => Promise<void>;
}

export const useTeamStore = create<TeamState>((set) => ({
  teams: [],
  loading: false,
  error: null,
  fetchTeams: async () => {
    set({ loading: true });
    try {
      const teams = await getTeams();
      set({ teams, loading: false });
    } catch (error) {
      set({ error: error as Error, loading: false });
    }
  },
  addTeam: async (teamData) => {
    try {
      const newTeam = await createTeam(teamData);
      set((state) => ({
        teams: [...state.teams, newTeam],
      }));
    } catch (error) {
      set({ error: error as Error });
    }
  },
  updateTeam: async (id, updates) => {
    try {
      const updatedTeam = await updateTeam(id, updates);
      set((state) => ({
        teams: state.teams.map((team) =>
          team.id === id ? updatedTeam : team
        ),
      }));
    } catch (error) {
      set({ error: error as Error });
    }
  },
}));