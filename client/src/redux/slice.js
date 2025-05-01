import { createSlice } from "@reduxjs/toolkit";


export const serviceSlice = createSlice({
    name: "service",
    initialState: {
        myInfo: null,
        openModal: false,
        projects: []
    },
    reducers: {
        addMyInfo: (state,action) =>{
            state.myInfo = action.payload.me;
        },
        addOpenModal: (state,action) => {
            state.openModal = action.payload;
        },
        addProjectInfo: (state,action) => {
            state.projects = action.payload;
        },
    },
});

export const {addMyInfo, addOpenModal,addProjectInfo} = serviceSlice.actions;

export default serviceSlice.reducer;