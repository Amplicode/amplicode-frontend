import { createSlice } from "@reduxjs/toolkit";
import {RootState} from "../../../core/store/store";

const initialState = {value: 0};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
    setValue(state, action) {
      state.value = action.payload;
    },
    reset(state) {
      state.value = 0;
    }
  }
});

export const {
  increment,
  decrement,
  setValue,
  reset
} = counterSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export const counterReducer = counterSlice.reducer;