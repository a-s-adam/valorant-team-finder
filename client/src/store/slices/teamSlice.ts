import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Team {
  id: string;
  name: string;
  leader: string;
  members: string[];
  rankRequirement: string;
  description: string;
}

interface TeamState {
  teams: Team[];
  currentTeam: Team | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: TeamState = {
  teams: [],
  currentTeam: null,
  isLoading: false,
  error: null,
};

const teamSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    setTeams: (state, action: PayloadAction<Team[]>) => {
      state.teams = action.payload;
    },
    setCurrentTeam: (state, action: PayloadAction<Team>) => {
      state.currentTeam = action.payload;
    },
    addTeam: (state, action: PayloadAction<Team>) => {
      state.teams.push(action.payload);
    },
    updateTeam: (state, action: PayloadAction<Team>) => {
      const index = state.teams.findIndex(team => team.id === action.payload.id);
      if (index !== -1) {
        state.teams[index] = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTeams,
  setCurrentTeam,
  addTeam,
  updateTeam,
  setLoading,
  setError,
} = teamSlice.actions;

export default teamSlice.reducer; 