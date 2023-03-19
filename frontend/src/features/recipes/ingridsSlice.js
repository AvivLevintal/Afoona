import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    currentIngrids: [[],[]]
}


export const ingridsSlice = createSlice({
    name: 'ingrid',
    initialState,
    reducers: {
        resetIngrids(state){
            return initialState
        } ,
       
        setCurrentIngrids(state, action){
            return{
                ...state,
                currentIngrids: action.payload
            }
        }
    }
})

export const {resetIngrids, setCurrentIngrids} = ingridsSlice.actions
export default ingridsSlice.reducer