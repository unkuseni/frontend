import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import themeReducer from './slices/themeSlice';
import menuReducer from './slices/menuSlice';
// Import your reducers here

const rootReducer = combineReducers({
  // Add your reducers here
  counter: counterReducer,
  theme: themeReducer,
  menuToggle: menuReducer
  
});

export default rootReducer;