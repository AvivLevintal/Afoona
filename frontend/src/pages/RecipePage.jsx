import {useEffect, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import React from 'react'
import RecipeTable from '../components/RecipeTable'
import RecipeItem from '../components/RecipeItem'
import RecipeNavbar from '../components/RecipeNavbar'
import Spinner from '../components/Spinner'
import {getDisplayRecipe} from '../features/recipes/recipeSlice'
import { useParams } from "react-router-dom"
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton,
         FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share'
import { ThemeProvider , createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import PageFooter from '../components/PageFooter'
import { Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import AdSense from 'react-adsense';
import useMediaQuery from '@mui/material/useMediaQuery';


function RecipePage() {

  const dispatch = useDispatch()

  const { isLoading, currentRecipe} = useSelector((state) => state.recipes)
  const {id} = useParams()
  const initialRender = useRef(true)


  useEffect(() => {
    if(initialRender.current){
      console.log('initial')
      dispatch(getDisplayRecipe(id))
      initialRender.current = false
    }
    else{
      console.log('not initial')
      dispatch(getDisplayRecipe(id))
    }

  }, [dispatch, id])

  const theme = useTheme()
  const isPhone = useMediaQuery(theme.breakpoints.down('md'));



  if(isLoading){
    return <Spinner/>
  }
  if(!isLoading && currentRecipe.length === 0){
    console.log('o')
    dispatch(getDisplayRecipe(id))
    return <Spinner/>
  }

  let small_img_url = '/imgs2/placeholder-small.webp'
  let big_img_url = '/imgs2/placeholder-recipe-big.webp'
  
  if(currentRecipe.recipe.imageScore !== 0){
     small_img_url = `/imgs2/${currentRecipe.recipe.imgFile.split('.')[0]}-small.webp`
     big_img_url= `/imgs2/${currentRecipe.recipe.imgFile.split('.')[0]}-recipe-big.webp`
  }



  document.title = currentRecipe.recipe.title


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

 
        <section className="heading">
          <RecipeNavbar/>
        </section>
        

        
        <Typography variant='h1' paddingBottom={{laptop: '1%', mobile: '3%'}} fontSize={{laptop: 50, tablet:35, mobile: 25}} className='recipe-counter'>{currentRecipe.recipe.title}</Typography>
        <meta name='title' content={currentRecipe.recipe.title}/>
        <meta name='description' content={currentRecipe.recipe.abstract}/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

          
          <Grid container spacing={2} direction='row-reverse' paddingLeft={{tablet: '8%', mobile: '0%', laptop: '10%'}}>
            <Grid item mobile={12} laptop={8} tablet={12} width={{mobile: '100%', laptop:'75%'}} className='right-col'>
            <Box
                component="img"

                aria-label='recipe-img'
                justifyContent='flex-grow'
                height = 'auto'
                maxHeight= '1000px'
                width = {{laptop: '100%', mobile:'104%'}}
                src={isPhone ? small_img_url : big_img_url}
                
              />
              
              <Stack spacing='20px' justifyContent='space-between'>
                <Grid container  justifyContent='space-between'>
                  <Grid item xs={8} paddingLeft={{laptop: '0%'}}>    
                      <FacebookShareButton url={window.location.href} quote={currentRecipe.recipe.title} >
                        <FacebookIcon size={50} round={true}/>
                      </FacebookShareButton>

                      <TwitterShareButton url={window.location.href} title={currentRecipe.recipe.title} >
                        <TwitterIcon size={50} round={true}/>
                      </TwitterShareButton>

                      <WhatsappShareButton url={window.location.href} title={currentRecipe.recipe.title} windowHeight='1000' windowWidth='1000' > 
                        <WhatsappIcon size={50} round={true}/>
                      </WhatsappShareButton>
                    </Grid>
                    <Grid item xs={4} className='fav-btn'>

                      <b className='img-src'>מקור : {currentRecipe.recipe.site}</b>
                    </Grid>
                </Grid>
                <Typography paragraph='true' fontSize={{laptop: 16, tablet: 18, mobile: 14}} sx={{border: 1, borderRadius: 2, paddingBottom: '3%'}} className='main-abstract'>
                  {currentRecipe.recipe.abstract}
                </Typography>
                <RecipeTable mode='recipe-tags' ingrids={currentRecipe.recipe.ingrids}/>
                <Grid item maxWidth={{mobile:'300px' ,laptop: '100%'}}  maxHeight={{mobile:'300px', laptop:'100%'}} mobile={12} tablet={12} laptop={4}>

                <AdSense.Google
                              client='ca-pub-2584354240102530'
                              slot='7926134707'
                              style={{ display: 'block' }}
                              format='horizontal'
                              responsive='true'
                          />
                </Grid>
                <div>
                <div>
                  <a href={currentRecipe.recipe.url} className='recipe-link'>קישור למתכון {currentRecipe.recipe.title}</a>
                </div>
                </div>
              </Stack>
            </Grid>
            <Grid item mobile={12} laptop={4} tablet={12} width={{mobile: '100%', laptop:'25%'}} >
          
              <Box 
                component='div'
                maxHeight={{laptop:'100%', mobile:'300px'}}
                maxWidth={{mobile:'300px', laptop:'100%'}}
                justifyContent={{mobile:'center', desktop:'flex-grow'}} 
                minHeight={{laptop:'800px' ,mobile:'300px'}}>
                {isPhone ? (
                       <AdSense.Google
                       client='ca-pub-2584354240102530'
                       slot='6912435935'
                       style={{ display: 'block' }}
                       format='auto'
                        responsive='true'
                    />
    
                ) :
                 (
                
                <AdSense.Google
                client='ca-pub-2584354240102530'
                slot='6912435935'
                style={{ display: 'block' }}
                format='vertical'
                responsive='true'
                />
                )}
              </Box>

            </Grid>
          </Grid>
            


        {currentRecipe.links.length > 0 ? (
        <Box sx={{width: '100%' ,  textAlign: 'right'}}>
          <h2 className='top10-title'>עוד מתכונים ממרכיבים דומים:</h2>
          <Grid container justifyContent='center' spacing={2} >
            {currentRecipe.links.map((recipe) =>(
              <RecipeItem recipe={recipe} mode={'related-links'}/>
            ))}
          </Grid>
        </Box>) 
         : (<></>)}
      <PageFooter/>
      </ThemeProvider>
    </>
  )
}

export default RecipePage