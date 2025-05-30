import React from 'react'
import { useAuth } from '../components/context/fakeauth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
export default function Protectedroute({children}) {
    const {isauthenticated}=useAuth();
    const navigate=useNavigate();
    useEffect(function(){if(!isauthenticated){navigate("/")}},[isauthenticated,navigate]);
  return isauthenticated?children:null;
}
