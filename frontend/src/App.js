import {Routes, Route, useLocation } from 'react-router-dom'
import Landing from './pages/Landing'
import { useEffect } from 'react'
import RecipePage from './pages/RecipePage'
import Terms from './pages/Terms'
import ReactGA from 'react-ga';

function App() {
  
  const location = useLocation()
  const TRACKING_ID = "UA-10562025-3"
  useEffect(() => {
    ReactGA.initialize(TRACKING_ID)
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [location]);

  return (
     <>

          <Routes>
            <Route path='/' element={<Landing />}/>
            <Route path='/recipes/index/:page.html' element={<Landing />}/>
            <Route path='/recipes/:ingrids.html' element={<Landing />}/>
            <Route path='/recipes/:ingrids/:page.html' element={<Landing />}/>
            <Route path='/:search/index.html' element={<Landing />}/>
            <Route path='/:search/index/:page.html' element={<Landing />}/>
            <Route path='/:search/:ingrids.html' element={<Landing />}/>
            <Route path='/:search/:ingrids/:page.html' element={<Landing />}/>
            <Route path='/recipe/:id' element={<RecipePage />}/>
            <Route path='/terms' element={<Terms />} />
          </Routes>

    </>

  )
}

export default App;
