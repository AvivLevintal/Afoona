import {useState, useEffect} from 'react'
import { useParams, useNavigate} from "react-router-dom";
import { navigateAfoona } from '../tools/prepareParams';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function SearchBar() {

    const [text, setText] = useState('')
    const {search, ingrids} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setText(search)
    }, [search])
    
    const onSubmit = (e) =>{
        e.preventDefault()
        navigate(navigateAfoona(text, ingrids, undefined))
        
    }
    const theme = useTheme()
    const isPhone = useMediaQuery(theme.breakpoints.down('tablet'));


      const SearchTitle = styled('h3')(({ theme }) => ({
        color: '#EEF2E6',
        fontSize: 24,
        paddingRight: '3%',
        [theme.breakpoints.down('md')]: {
            fontSize: 24,
            textAlign: 'center'
        }
      }))


  return (

        <form onSubmit={onSubmit}>
            <SearchTitle>אני מחפש</SearchTitle>
            <Grid container spacing={1}  direction={`${isPhone ? `` : `row-reverse`}`} alignItems='center' width='100%'>
                <Grid item mobile={12} tablet={9} laptop={9}  paddingRight='10%' sx={{width: '75%'}}>
                        <TextField 
                            variant="filled"
                            aria-label='search-bar'
                            InputProps={{
                                inputProps: {
                                    style: { textAlign: "right",
                                            fontSize: 18 ,
                                            border: "none",
                                            direction: "rtl",
                                            alignSelf: 'mid',
                                            paddingBottom: '3%',
                                            borderRarius: 1 ,
                                            height: `${isPhone ? `1.5vh` : `0.5vh`}`,
                                            minHeight:`${isPhone ? `1.5vh` : `0.5vh`}`
                                            },
                                }
                            }}
                            sx={{backgroundColor: '#EEF2E6', borderRadius: 1.5, height: `${isPhone ? `4.5vh` : `10%`}` , minHeight: `${isPhone ? `40px` : `4.5vh`}`, width: `${isPhone ? `58vw` : `40vw`}` }}
                            onChange={(e) => setText(e.target.value)}
                        />
                </Grid>           
                <Grid item  mobile={12} tablet={3} laptop={3} paddingRight={{mobile: '8%', laptop:'0%'}}>          
                    <Button variant="contained" 
                    aria-label='search-button'
                    sx={{height: `${isPhone ? `4.5vh` : `3.8vh`}`,
                         minHeight: `${isPhone ? `30pxvh` : `3.8vh`}`,
                         paddingLeft: '11%',
                         width: `${isPhone ? `40vw` : `10vw`}`,
                          backgroundColor: '#1C6758',
                            '&:hover': {
                            backgroundColor: '#EEF2E6',
                            color: 'black',
                         }}} type='submit'>
                        חפש
                    </Button>
                </Grid>

            </Grid>

        </form>
  )
}

export default SearchBar