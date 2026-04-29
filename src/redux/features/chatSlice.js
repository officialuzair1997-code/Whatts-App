import { createSlice } from '@reduxjs/toolkit';
import { allUsers } from '../../utils';

const initialState = {
  users: JSON.parse(localStorage.getItem('users')) || allUsers,
  selectedUserId: null,
  searchQuery: '',
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
      localStorage.setItem('users', JSON.stringify(action.payload));
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(u => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
        localStorage.setItem('users', JSON.stringify(state.users));
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(u => u.id !== action.payload);
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    setSelectedUserId: (state, action) => {
      state.selectedUserId = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { 
  setUsers, 
  addUser, 
  updateUser, 
  deleteUser, 
  setSelectedUserId, 
  setSearchQuery 
} = chatSlice.actions;

export default chatSlice.reducer;
