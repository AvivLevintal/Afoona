import { useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import {arrToIngrids, ingridsToArr, navigateAfoona} from '../tools/prepareParams'
import { useParams, useNavigate} from 'react-router-dom'
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';


function IngridItem({ingrid}) {
  let {currentIngrids} = useSelector((state) => state.ingrids)
  const [text, setText] = useState('עם')
  const navigate = useNavigate()
  const {search, ingrids} = useParams()


  const WithIngridItem = styled(Paper)(({ theme }) => ({
    backgroundColor: '#1C6758',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: 'white',
  }));


  useEffect(() => {
    if(currentIngrids[0].includes(ingrid)){
      setText('עם')
    }
    else{
      setText('ללא')
    }
  },[currentIngrids, ingrid])


  const removeIngrid = () =>{
    let new_ingrids = []
    if(currentIngrids[0].includes(ingrid)){
      new_ingrids = currentIngrids[0].filter(word => word !== ingrid)
      navigate(navigateAfoona(search, arrToIngrids([[...new_ingrids],[...currentIngrids[1]]]), 1))
    }
    else{
      new_ingrids = currentIngrids[1].filter(word => word !== ingrid)
      navigate(navigateAfoona(search, arrToIngrids([[...currentIngrids[0]],[...new_ingrids]]), 1))

    }
  
  }
  const onClick = () =>{
    if(text === 'עם'){
      let new_ingrids = ingridsToArr(ingrids)
      new_ingrids[0] = new_ingrids[0].filter(word => word !== ingrid)
      new_ingrids[1].push(ingrid.trim())
      new_ingrids[1] = new_ingrids[1].filter(word => word !== '')
      navigate(navigateAfoona(search, arrToIngrids([[...new_ingrids[0]],[...new_ingrids[1]]]), 1))

    }
    else{
      let new_ingrids = ingridsToArr(ingrids)
      new_ingrids[1] = new_ingrids[1].filter(word => word !== ingrid)
      new_ingrids[0].push(ingrid.trim())
      new_ingrids[0] = new_ingrids[0].filter(word => word !== '')
      navigate(navigateAfoona(search, arrToIngrids([[...new_ingrids[0]],[...new_ingrids[1]]]), 1))
    }
  }
  
  if(text === 'עם'){
    return (
      <Grid item>
          <Grid container sx={{ border: 1, borderRadius: 1}}>
            <Grid item xs='auto'>
              <WithIngridItem>עם {ingrid}</WithIngridItem>
            </Grid>
            <Grid item xs='auto'>
              <IconButton
              aria-label='switch'
              variant="contained"  
              startIcon={`/imgs2/ingridSwitch.png`}
              sx={{
                  width: '36px',
                  height: '36px',
                    backgroundColor: '#1C6A58',
                      '&:hover': {
                      backgroundColor: '#EEF2E6',
                      color: 'black',
                   }}} onClick={onClick.bind(this)}>
                    <img aria-label='switch-inner' src={`/imgs2/ingridSwitch.png`}/>
              </IconButton>
            </Grid>
            <Grid item xs={1}>  
              <IconButton variant="contained" 
              aria-label='close'
              sx={{
                    width: '36px',
                    height: '36px',
                    backgroundColor: '#D22929',
                      '&:hover': {
                      backgroundColor: 'black',
                      color: 'white',
                   }}} onClick={removeIngrid}>
                    X
                </IconButton>
            </Grid>
          </Grid>
      </Grid>
    )
  }
  else{
    return (
      <Grid item>
          <Grid container sx={{ border: 1, borderRadius: 1}}> 
            <Grid item xs='auto'>
              <WithIngridItem>ללא {ingrid}</WithIngridItem>
            </Grid>
            <Grid item xs='auto'>
            <IconButton
              aria-label='switch'
              variant="contained" 
              startIcon={`/imgs2/ingridSwitch.png`}
              sx={{
                  width: '36px',
                  height: '36px',
                    backgroundColor: '#1C6A58',
                      '&:hover': {
                      backgroundColor: '#EEF2E6',
                      color: 'black',
                   }}} onClick={onClick.bind(this)}>
                    <img aria-label='switch-inner' src={`/imgs2/ingridSwitch.png`}/>
              </IconButton>
            </Grid>
            <Grid item xs='1'>
            <IconButton variant="contained" 
              aria-label='close'
              sx={{
                    width: '36px',
                    height: '36px',
                    backgroundColor: '#D22929',
                      '&:hover': {
                      backgroundColor: 'black',
                      color: 'white',
                   }}} onClick={removeIngrid}>
                    X
                </IconButton>
            </Grid>
          </Grid>
      </Grid>
    )
  }

}

export default IngridItem