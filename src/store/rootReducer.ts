import { combineReducers } from "@reduxjs/toolkit";
import disclaimerReducer from "./slices/disclaimerSlice";
import themeReducer from "./slices/themeSlice";
import menuReducer from "./slices/menuSlice";
import authReducer from "./slices/authSlice";
import genderReducer from "./slices/genderSlice";
import callReducer from "./slices/callSlice";
import chatHistoryReducer from "./slices/chatHistorySlice";
import conversationReducer from "./slices/conversationSlice";
import chatReducer from "./slices/chatSlice";
// Import your reducers here

const rootReducer = combineReducers({
  // Add your reducers here
  disclaimer: disclaimerReducer,
  theme: themeReducer,
  menuToggle: menuReducer,
  auth: authReducer,
  gender: genderReducer,
  call: callReducer,
  conversation: conversationReducer,
  chatHistory: chatHistoryReducer,
  chat: chatReducer,
});

export default rootReducer;
