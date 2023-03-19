import { Link, useNavigate, useParams} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { clickRecipe } from '../features/recipes/recipeSlice'
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';
import { navigateAfoona, ingridsToArr, arrToIngrids} from '../tools/prepareParams'
import RecipeTable from './RecipeTable';


function RecipeItem({recipe, mode}) {
  const dispatch = useDispatch()  
  const navigate = useNavigate()
  const {search, ingrids, page} = useParams()



  const onClick = () =>{
      dispatch(clickRecipe(recipe._id)) 
  }
  const flipIngrid = (ingrid) =>{

    if(ingrids !== undefined){
      let new_ingrids = ingridsToArr(ingrids)
      new_ingrids[0].push(ingrid.trim())
      new_ingrids[0] = new_ingrids[0].filter(word => word !== '')
      new_ingrids = arrToIngrids(new_ingrids)
      navigate(navigateAfoona(search, new_ingrids, page))
    }
    else{
      navigate(navigateAfoona(search, ingrid, page))
    }

  }

  let img_url = '/imgs2/placeholder-small.webp'
  
  if(recipe.imageScore !== 0){
     img_url = `/imgs2/${recipe.imgFile.split('.')[0]}-small.webp`
  }
  

  if(mode === 'ingrids'){
    return (
      <Grid item mobile={12} tablet={5} laptop={3}  sx={{width: 274, margin: 0.75, border: 0.5, borderColor: '#E8E8E8', textAlign: 'right'}}>
        <Stack >
          <img src={img_url} aria-label='recipe-img' className='small-img' onClick={() => {navigate('/recipe/' + encodeURIComponent(recipe._id)); onClick()}}/>
          <Link to={'/recipe/' + encodeURIComponent(recipe._id)} onClick={onClick} className='recipe-box-title'> {recipe.title} <br/></Link>
          <RecipeTable mode='front-page' ingrids={recipe.ingrids} callback={flipIngrid}/>

        </Stack>         
      </Grid>
    )
  }
  
  if(mode === 'related-links'){
    return (
      <Grid item mobile={12} tablet={5} laptop={2} sx={{width: 274, margin: 0.75, border: 0.5, borderColor: '#E8E8E8', textAlign: 'right'}}>
          <Stack>
            <img src={img_url} aria-label='recipe-img' className='small-img' onClick={() => {navigate('/recipe/' + encodeURIComponent(recipe._id)); onClick()}}/>
            <Link to={'/recipe/' + encodeURIComponent(recipe._id)} onClick={onClick} className='recipe-box-title'> {recipe.title} <br/></Link>
            
            <RecipeTable mode='recipe-page' ingrids={recipe.ingrids}/>

          </Stack>         
      </Grid>

    )
  }


  else if (mode === 'abstract'){
    return(
      <Grid item mobile={12} tablet={5} laptop={2} sx={{width: 274, margin: 0.75, border: 0.5, borderColor: '#E8E8E8', textAlign: 'right'}}>
        <Stack >
          <img src={img_url} aria-label='recipe-img' className='small-img' onClick={() => {navigate('/recipe/' + encodeURIComponent(recipe._id)); onClick()}} />
          <Link to={'/recipe/' + encodeURIComponent(recipe._id)} onClick={onClick} className='recipe-box-title'> {recipe.title} <br/></Link>
        
          <span className='.small-abstract'>{recipe.abstract}</span>
        </Stack>         
      </Grid>
    )
  }

}

export default RecipeItem


