import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null,
    destination: null,
    travelTimeInformation: null,
}

export const navSlice = createSlice({
    name: 'nav', //name of slice
    initialState,
    reducers: {
        setOrigin: (state, action) => { //state is current state.
            state.origin = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload;
        },
    }
  })

//Actions
export const { setOrigin, setDestination, setTravelTimeInformation } = navSlice.actions; 

//Selectors
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation;

export default navSlice.reducer;