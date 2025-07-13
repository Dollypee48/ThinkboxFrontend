import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import problemService from "./problemService";

const initialState = {
  problems: [],
  loading: false,
  error: null,
};

// 👉 Create a new problem
export const createProblem = createAsyncThunk(
  "problems/create",
  async (problemData, thunkAPI) => {
    try {
      return await problemService.createProblem(problemData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error creating problem"
      );
    }
  }
);

// 👉 Get all problems for the logged-in user
export const getProblems = createAsyncThunk(
  "problems/getAll",
  async (_, thunkAPI) => {
    try {
      return await problemService.getProblems();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error fetching problems"
      );
    }
  }
);

const problemSlice = createSlice({
  name: "problems",
  initialState,
  reducers: {
    // Optional: for future use (e.g., reset state)
    clearProblemError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🛠 createProblem
      .addCase(createProblem.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProblem.fulfilled, (state, action) => {
        state.loading = false;
        state.problems.push(action.payload);
        state.error = null;
      })
      .addCase(createProblem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🧠 getProblems
      .addCase(getProblems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProblems.fulfilled, (state, action) => {
        state.loading = false;
        state.problems = action.payload;
        state.error = null;
      })
      .addCase(getProblems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProblemError } = problemSlice.actions;
export default problemSlice.reducer;
