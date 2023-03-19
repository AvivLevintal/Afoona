import {useState} from 'react'
import { useSelector} from 'react-redux'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useParams, useNavigate} from 'react-router-dom'
import { arrToIngrids, ingridsToArr, navigateAfoona } from '../tools/prepareParams';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function IngridBar() {

    const { currentIngrids } = useSelector((state) => state.ingrids)
    const [text, setText] = useState('')
    const [autoIngrids, setAutoIngrids] = useState([])
    const API_URL = 'https://www.afoona.com/api/ingrids/autocomplete/'
 
    const navigate = useNavigate()
    const {search, ingrids, page} = useParams()
  

    
    const handleAutocomplete = async (query) =>{
        if(query.replace(/\s/g, '').length){
            let response = await axios.get(API_URL + query.trim(), {decompress: true, headers: {
                'Content-Encoding': 'gzip'
             }})
            console.log(response)
            setAutoIngrids(response.data)
        }
    }
    const getCannon = (name) => {
        for (let i = 0; i < autoIngrids.length; i++){
            if(autoIngrids[i]['name'] === name)
                return autoIngrids[i]['cannon']
        }
        return name
    }

    const onClick = async () =>{
        setText(text.trim())
        let to_append = getCannon(text.trim())

        if(!(currentIngrids[0].includes(to_append.trim()) || currentIngrids[1].includes(to_append.trim())) && to_append !== '' && to_append.match(/,/g) == null){
            if(ingrids !== undefined){
                let new_ingrids = ingridsToArr(ingrids)
                new_ingrids[0].push(to_append.trim())
                new_ingrids[0] = new_ingrids[0].filter(word => word !== '')
                navigate(navigateAfoona(search, arrToIngrids(new_ingrids), page))
            }
            else{
                navigate(navigateAfoona(search, to_append.trim(), page))
            }

            setText('')
        }
    }

    const theme = useTheme()
    const isPhone = useMediaQuery(theme.breakpoints.down('tablet'));

    const SearchTitle = styled('h3')(({ theme }) => ({
        color: 'black',
        fontSize: 18,
        paddingTop: '2%',
        paddingRight: '3%',
        [theme.breakpoints.down('md')]: {
            fontSize: 24,
            textAlign: 'center'
        }
      }))



    return (

    <>
        <SearchTitle className='search-text'>מתכונים עם/בלי</SearchTitle>
        <Grid container spacing={1} direction={`${isPhone ? `` : `row-reverse`}`} justifyContent='flex-start' width='100%'>
            <Grid item mobile={12} tablet={2} laptop={2} >
                <Autocomplete
                    freeSolo
                    id="text"
                    aria-label='ingrid-bar-auto'
                    value={text}
                    disableClearable
                    sx={{width: '10vw'}}
                    ListboxProps={{ style: { maxHeight: 300 } }}
                    options={autoIngrids ? [...new Set(autoIngrids.map((option) => option.name))]: []}
                    onSelectCapture={(e) => setText(e.target.value)}
                    renderInput={(params) => (
                    <TextField 
                        {...params}
                        variant="filled"
                        aria-label='ingrid-bar'
                        InputProps={{ 
                            ...params.InputProps,
                            style: { backgroundColor: 'white', width: `${isPhone ? `59vw` : `10vw`}`,paddingBottom: '4vh', minHeight:`${isPhone ? `35px` : `4.3vh`}`
                            , paddingTop:'0.2vh', height: `${isPhone ? `4vh` : `3vh`}`, wordBreak: 'break-word',direction: "rtl", textAlign: "right"}
                        }}
                        sx={{border: 1, width: `${isPhone ? `60vw` : `10.2vw`}`, height: `${isPhone ? `3.5vh` : `4.3vh`}`, minHeight:  `${isPhone ? `35px` : `4.3vh`}` , borderRadius: 1.5, borderColor: 'grey.500'}}
                            onChange={(e) => handleAutocomplete(e.target.value)}
                    />
                    )}
                />  
            </Grid>
   
            <Grid item mobile={12} tablet={3} laptop={3} paddingRight={`${isPhone ? `33%` : ``}`}>
                <Button variant="contained" 
                    aria-label='ingrid-button'
                    sx={{   height: '3.8vh',
                            minHeight:  `${isPhone ? `30px` : `3.8v`}`,
                            width: `${isPhone ? `40vw` : `5vw`}`,
                            backgroundColor: '#1C6758',
                            '&:hover': {
                            backgroundColor: '#EEF2E6',
                            color: 'black',
                         }}} onClick={onClick}>
                    הוסף
                </Button>
            </Grid>
        </Grid>
    </>
 
      
            
  )
}

export default IngridBar