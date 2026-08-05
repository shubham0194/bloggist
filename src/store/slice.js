import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status : false,
    userData : null,
    username : null,
}

const slice = createSlice({

    name : "auth",
    initialState,
    reducers : {
        login: (state,action) => {
            state.status = true;
            state.userData = action.payload.userData;
            state.username = action.payload.userData?.name || null;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.username = null;
        }

    }
})

export const {login , logout} = slice.actions;

export default slice.reducer;