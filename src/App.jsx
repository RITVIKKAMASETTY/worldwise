import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import {useEffect,useState} from 'react';
import HomePage from './pages/Homepage.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import Pricing from './pages/Pricing.jsx';
import Product from './pages/Product.jsx';
import Login from './pages/Login.jsx';
import Apployout from './components/AppLayout.jsx';
import Citylist from './components/Citylist.jsx';
import Countrylist from './components/Countrylist.jsx';
import City from './components/City.jsx';
import Form from './components/Form.jsx';
import { CitiesProvider,useCities } from './components/context/CitiesContext.jsx';
import {FakeAuth } from './components/context/fakeauth.jsx';
const baseurl="http://localhost:3001";

function App() {
  
  return (<FakeAuth>
  <CitiesProvider>
    <BrowserRouter>
    <Routes>
      <Route index element={<HomePage />} />

      <Route path="/app" element={<Apployout />}>

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
  </BrowserRouter>
  </CitiesProvider>
  </FakeAuth>
  )
}

export default App
