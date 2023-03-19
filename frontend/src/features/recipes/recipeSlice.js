import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import recipeService from './recipeService'

const initialState = {
    recipes: [],
    top10: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    currentRecipe: []
}

export const getRecipes = createAsyncThunk('recipes/getQuery', async (query , thunkAPI) =>{
    try {   
        return await recipeService.getRecipes(query)
    } catch (error) {
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getTop10 = createAsyncThunk('recipes/getTop10', async (thunkAPI) =>{
    try {   
        return await recipeService.getTop10()
    } catch (error) {
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
export const getDisplayRecipe = createAsyncThunk('recipes/getDisplay', async (query , thunkAPI) =>{
    try {   
        return await recipeService.getDisplayRecipe(query)
    } catch (error) {
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const clickRecipe = createAsyncThunk('click/recipe', async (query , thunkAPI) =>{
    try {   
        return await recipeService.clickRecipe(query)
    } catch (error) {
        const message = error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})



export const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        reset(state){
            return initialState
        } ,
        setCurrentRecipe(state, action){
            return{
                ...state,
                currentRecipe: action.payload
            }
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(getRecipes.pending, (state) =>{
 
            state.isLoading = true
        })
        .addCase(getRecipes.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.recipes = action.payload
        })
        .addCase(getRecipes.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getTop10.pending, (state) =>{
 
        })
        .addCase(getTop10.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.top10 = action.payload
        })
        .addCase(getTop10.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getDisplayRecipe.pending, (state) =>{
            state.isLoading= true
        })
        .addCase(getDisplayRecipe.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.currentRecipe = action.payload
        })
        .addCase(getDisplayRecipe.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(clickRecipe.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(clickRecipe.fulfilled, (state, action) =>{
            state.isSuccess = true
        })
        .addCase(clickRecipe.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset , setCurrentRecipe} = recipeSlice.actions
export default recipeSlice.reducer