import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import SearchBar from '../components/SearchBar'
import IngridBar from '../components/IngridBar'
import Spinner from '../components/Spinner'
import { useRef } from 'react'
import {getRecipes, reset, getTop10} from '../features/recipes/recipeSlice'
import { setCurrentIngrids, resetIngrids} from '../features/recipes/ingridsSlice'
import RecipeItem from '../components/RecipeItem'
import IngridItem from '../components/IngridItem'
import {  useNavigate, useParams} from "react-router-dom"
import RecipeNavbar from '../components/RecipeNavbar'
import Grid from '@mui/material/Grid';
import {  navigateAfoona, ingridsToArr } from '../tools/prepareParams'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import PageFooter from '../components/PageFooter'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AdSense from 'react-adsense';

function Landing() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {search, ingrids, page} = useParams()
  const {recipes, isLoading, top10} = useSelector((state) => state.recipes)
  const {currentIngrids} = useSelector((state) => state.ingrids)
  const initialRender = useRef(true);
  let ingrids_url = ingridsToArr(ingrids)

  useEffect(() =>{
    if(initialRender.current){
    
        if((ingrids === undefined || ingrids === '') && (search === undefined || search === '')){
          dispatch(getTop10())
          dispatch(resetIngrids())
          dispatch(getRecipes({
            'search': '', 'ingrids': '', '_ingrids': ''
          }))
        }
        else{
          initPage()
        }
      initialRender.current = false
  }
  else{
    initPage()

}}, [dispatch, search, ingrids, page])


const initPage = () =>{
  let ingrids_url = ingridsToArr(ingrids)

  
  let query_obj = {
    "search": '',
    "ingrids":  ingrids_url[0].join(','),
    "_ingrids": ingrids_url[1].join(','),
    "page": 0
  }
  if(search !== undefined)
    query_obj.search = search

  if(page !== undefined && parseInt(page) >= 1)
    query_obj.page = parseInt(page)
  

  dispatch(reset())
  dispatch(getTop10())
  dispatch(getRecipes(query_obj))

  dispatch(setCurrentIngrids(ingridsToArr(ingrids)))


}
const processTitle = () =>{
  let title = 'מתכוני '
  if(search !== undefined && search !== ''){
      title += search
    }

    else{
      title = 'מתכונים'
    }

  if(ingrids !== undefined && ingrids !== '')
    {
      if(ingrids_url[0].length > 0 && ingrids_url !== undefined)
        title += ' עם ' + ingrids_url[0].join(',')

      if(ingrids_url[1].length > 0 && ingrids_url !== undefined)
        title += ' בלי ' + ingrids_url[1].join(',')
    }

  
    if(title === 'מתכוני ' || title === 'מתכונים'){
      return 'אפונה - אינדקס מתכונים'
    }
    return title

}

const shuffleArr = (recipes) => {
  let array = [...recipes, 'ad1', 'ad2']
  let currentIndex = array.length,  randomIndex;
  
  while (currentIndex !== 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}



  const theme = useTheme()
  const isPhone = useMediaQuery(theme.breakpoints.down('md'));



  if(isLoading){
     return <Spinner/>
   }
  let meta_title = processTitle()
  document.title = meta_title
  

  return (
    <>



      <ThemeProvider
            theme={createTheme({
              breakpoints: {
                values: {
                  laptop: 1024,
                  tablet: 768,
                  mobile: 0,
                  desktop: 1280,
                },
              },
            })}
          >
        <meta name='title' content={meta_title}/>

        <meta name='description' content={meta_title}/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <RecipeNavbar/>

      <Box sx={{width: '100%', paddingBottom: `${isPhone ? `3vh` : `2vh`}` , backgroundColor: '#528F71', textAlign: 'right'}}>
        <Stack className='top-bar-stack'>
          <SearchBar/>
        </Stack>
      </Box>
      <Box justifyContent='flex-end' sx={{width: '100%', paddingBottom: `${isPhone ? `3vh` : `1vh`}` , backgroundColor: 'white', textAlign: 'right'}}>
        <Stack className='top-bar-ingrids'>
          <IngridBar/>

              <Grid container spacing={2} sx={{paddingTop: 5}} direction='row-reverse' width='100%'>
                {currentIngrids[0].map((ingrid) => (<IngridItem ingrid={ingrid}/>))}
                {currentIngrids[1].map((ingrid) => (<IngridItem ingrid={ingrid}/>))}
              </Grid>
        </Stack>
      </Box>
 
  

      <h1 className='recipe-counter'>{meta_title}</h1>
        <Grid container spacing={2} direction='row-reverse' paddingLeft={{tablet: '8%', mobile: '0%', laptop: '10%'}} 
        paddingRight={{tablet: '0%',mobile: '10%', laptop: '5%'}} width='100%'>
          
          <Grid item mobile={12} laptop={9} >
            {recipes.total > 0 ? (
            <Grid container spacing={2} margin={{laptop: 3, mobile: 3, tablet: 0}}>
                {shuffleArr(recipes.recipe).map((recipe) => 
                  {if(recipe === 'ad1')
                    return (
                  <Grid item mobile={12} tablet={5} laptop={3} sx={{width: 274, margin: 0.75, border: 0.5, borderColor: '#E8E8E8', textAlign: 'center'}}>
                    <Stack>
                      <AdSense.Google
                        client='ca-pub-2584354240102530'
                        slot='3295774497'
                        style={{ display: 'block' }}
                        format='rectangle'
                        responsive='true'
                      />
                    </Stack>         
                  </Grid>) 
                    else if (recipe === 'ad2')
                      return (
                        <Grid item mobile={12} tablet={5} laptop={3} sx={{width: 274, margin: 0.75, border: 0.5, borderColor: '#E8E8E8', textAlign: 'center'}}>
                          <Stack>
                          <AdSense.Google
                              client='ca-pub-2584354240102530'
                              slot='7104007625'
                              style={{ display: 'block' }}
                              format='rectangle'
                              responsive='true'
                          />
                          </Stack>         
                        </Grid>) 
                    else
                      return (<RecipeItem  recipe={recipe} mode={'ingrids'}/>)                 
                  })}
            </Grid>) 
            :(<></>)}
          </Grid>
          {isPhone ?
          (
          <Grid item mobile={12} tablet={12} laptop={3} maxHeight={{laptop:'100%', mobile:'300px'}} justifyContent='center' minHeight={{laptop:'75vh' ,mobile:'300px'}} >
              <AdSense.Google
                              client='ca-pub-2584354240102530'
                              slot='9538599271'
                              style={{ display: 'block' }}
                              format='auto'
                              responsive='true'
                          />
          </Grid>) :
           (<Grid item mobile={12} tablet={12} laptop={3} maxHeight={{laptop:'100%', mobile:'300px'}} justifyContent='flex-end' minHeight={{laptop:'75vh' ,mobile:'300px'}} >
           <AdSense.Google
                           client='ca-pub-2584354240102530'
                           slot='9538599271'
                           style={{ display: 'block' }}
                           format='vertical'
                           responsive='true'
                       />
          </Grid>)}
        </Grid>

        <Stack className='pages' spacing={2}>
          <Pagination size={`${isPhone ? `medium` : `large`}`} count={Math.ceil(recipes.total/10)} siblingCount={1} 
            page={(page) === undefined ? 1 : parseInt(page)} onChange={(event, page) => {
            if(page === undefined)
              navigate(navigateAfoona(search, ingrids, 1))
            else
              navigate(navigateAfoona(search, ingrids, page))
          }} />
        </Stack>
     

        {top10.length > 0 ? (
        <>
          <h2 className='top10-title'>עשרת המתכונים הפופולרים של היום:</h2>
          <Grid container spacing={2} direction='row-reverse' paddingLeft={{tablet: '4%', mobile: '6%', laptop: '5%'}} 
          paddingRight={{tablet: '9%',mobile: '0%', laptop: '11%'}} width='100%' >
            {top10.map((recipe) =>(
              <RecipeItem  recipe={recipe} mode={'abstract'}/>
            ))}
          </Grid>
        </>

       ) 
         : (<></>)}
         <PageFooter/>
      </ThemeProvider>
    </>
  )
}

export default Landing