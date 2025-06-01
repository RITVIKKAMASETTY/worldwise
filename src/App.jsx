import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import {lazy, Suspense, useEffect,useState} from 'react';
import Citylist from './components/Citylist.jsx';
import Countrylist from './components/Countrylist.jsx';
import City from './components/City.jsx';
import Form from './components/Form.jsx';
import { CitiesProvider,useCities } from './components/context/CitiesContext.jsx';
import {FakeAuth } from './components/context/fakeauth.jsx';
import Protectedroute from './pages/Protectedroute.jsx';
import Spinner from './components/Spinner.jsx';
import SpinnerFullPage from './components/SpinnerFullPage.jsx';


// import Login from './pages/Login.jsx';
// import Apployout from './components/AppLayout.jsx';
// import Pricing from './pages/Pricing.jsx';
// import Product from './pages/Product.jsx';
// import HomePage from './pages/Homepage.jsx';
// import PageNotFound from './pages/PageNotFound.jsx';
const HomePage=lazy(()=>import('./pages/Homepage.jsx'));
const Login=lazy(()=>import('./pages/Login.jsx'));
const Apployout=lazy(()=>import('./components/AppLayout.jsx'));
const Pricing=lazy(()=>import('./pages/Pricing.jsx'));
const Product=lazy(()=>import('./pages/Product.jsx'));
const PageNotFound=lazy(()=>import('./pages/PageNotFound.jsx'));
const baseurl="http://localhost:3001";
function App() {
  
  return (<FakeAuth>
  <CitiesProvider>
    <BrowserRouter>
    <Suspense fallback={<SpinnerFullPage/>}>
    <Routes>
      <Route index element={<HomePage />} />

      <Route path="/app" element={<Protectedroute><Apployout /></Protectedroute>}>

      <Route index element={<Navigate replace to="cities"/>}/>
      <Route path="/app/map" element={<p>maps</p>}/>
      <Route path="/app/cities" element={<Citylist/>}/>
      <Route path="cities/:id" element={<City/>}/>
      <Route path="/app/countries" element={<Countrylist/>}/>
      <Route path="/app/form" element={<Form/>}/>

      </Route>
      <Route path="/pricing" element={<Pricing/>} />
      <Route path="/product" element={<Product/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    </Suspense>
  </BrowserRouter>
  </CitiesProvider>
  </FakeAuth>
  )
}

export default App
