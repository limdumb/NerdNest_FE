import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 인증데이터에 대한 Set
interface AuthState {
  memberId: number;
}

const initialState: AuthState = {
  memberId: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //추가 스터디 할 필요 있음
    setMemberId(state, action: PayloadAction<number>) {
      state.memberId = action.payload;
    },
  },
});

export const { setMemberId } =
  authSlice.actions;
export default authSlice.reducer;
