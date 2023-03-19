import axios from 'axios'
let API_URL = 'https://www.afoona.com/api/recipes/search/'
let API_URL2 = 'https://www.afoona.com/api/recipes/display/'
let API_URL3 = 'https://www.afoona.com/api/recipes/click/'
let API_URL4 = 'https://www.afoona.com/api/recipes/top10/'

const getRecipes = async (text) => {

    const response = await axios.post(API_URL, {
        data:{
            query: text
        }
    })

    return response.data

}

const getTop10 = async (text) => {
    
    const response = await axios.get(API_URL4, {decompress: true, headers: {
        'Content-Encoding': 'gzip'
     }} )

    return response.data

}

const getDisplayRecipe = async (text) => {
    
    const response = await axios.get(API_URL2.concat(text), {decompress: true, headers: {
        'Content-Encoding': 'gzip'
     }})
    return response.data
}

const clickRecipe = async (text) => {
    const response = await axios.put(API_URL3.concat(text), {decompress: true, headers: {
        'Content-Encoding': 'gzip'
     }})
    return response.data

}

const recipeService = {
    getRecipes,
    getDisplayRecipe,
    clickRecipe,
    getTop10
}

export default recipeService