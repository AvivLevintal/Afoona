
import * as React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { navigateAfoona } from '../tools/prepareParams';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import IconButton from '@mui/material/IconButton';
import { setCurrentIngrids } from '../features/recipes/ingridsSlice';

export default function RecipeTable(props) {
  const { currentIngrids } = useSelector((state) => state.ingrids)
  const dispatch = useDispatch()
  const {search, page} = useParams()
  const [ isOpen, setIsOpen ] = useState(false)
  const THRESHOLD = 5

  const handleCollapse = () => {
    setIsOpen(!isOpen)
  } 

  const IngridItem = styled(Paper)(({ theme }) => ({
    backgroundColor: '#EEF2E6',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: 'black',
    '&:hover': {
      backgroundColor: '#EEF2E6',
      color: 'black',
   }
  }));

  
  const SelectedIngridItem = styled(Paper)(({ theme }) => ({
    backgroundColor: '#EEF2E6',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    ':hover': {
      backgroundColor: '#EEF2E6',
      color: 'black',
   }
  }));

  if(props.mode === 'recipe-tags'){
    return(
      <Grid container spacing={1} direction='row-reverse' sx={{paddingBottom: 5}} >
      {props.ingrids.map((ingrid) => {
          return (
            <Grid item xs='auto'>
              <IngridItem>
                <Link to={navigateAfoona(search, ingrid, page)} onClick={() => dispatch(setCurrentIngrids([[ingrid],[]]))} >
                  {ingrid}
                </Link>   
              </IngridItem>
            </Grid>
          ) 
      })}
    </Grid>
    )

  }
  if (props.mode === 'recipe-page'){
    let iter = 0
    
    if(props.ingrids !== undefined)
      return (
        <>
          <Grid container spacing={1} direction='row-reverse' sx={{paddingBottom: 5}} >
            {props.ingrids.map((ingrid) => {
              iter += 1
              if (isOpen || iter < THRESHOLD)
                return (
                  <Grid item xs='auto'>
                    <IngridItem>
                      <Link to={navigateAfoona(search, ingrid, page)} onClick={() => dispatch(setCurrentIngrids([[ingrid],[]]))}>
                        {ingrid}
                      </Link>   
                    </IngridItem>
                  </Grid>
                )

            })}
          </Grid>
            {(props.ingrids.length >= 5) ? 
          (<IconButton onClick={handleCollapse.bind(this)}> {(isOpen) ? <ExpandLess /> : <ExpandMore/>} </IconButton>) :
          (<> </>)}

        </>

      )
  }
  
  else if(props.mode === 'front-page'){
    let iter = 0
    return(

      <>
      <Grid container spacing={1} direction='row-reverse' sx={{paddingBottom: 5}} >
        


        {props.ingrids.map((ingrid) => {
          if(currentIngrids[0].includes(ingrid) || currentIngrids[1].includes(ingrid))
            return (
              <Grid item xs='auto'>
                <SelectedIngridItem className='recipe-table-selected'>
                  {ingrid}
                </SelectedIngridItem>
              </Grid>
            )
            iter += 1
            if (isOpen || iter < THRESHOLD)
            return (
              <Grid item xs='auto'>
                <Button
                  variant="contained" 
                  sx={{
                      backgroundColor: '#EEF2E6',
                      color: 'black',
                      '&:hover': {
                      backgroundColor: '#EEF2E6',
                      fontWeight: 'bold'
                     }}} onClick={props.callback.bind(this, ingrid)}>
                      {ingrid}
                </Button>
              </Grid>
            )
        }
          
        )}

      </Grid>
      {(props.ingrids.length >= 5) ? 
        (<IconButton onClick={handleCollapse.bind(this)}> {(isOpen) ? <ExpandLess /> : <ExpandMore/>} </IconButton>) :
        (<> </>)}


    </>
    )
  }

}

