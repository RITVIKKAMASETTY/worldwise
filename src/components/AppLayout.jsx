import React from 'react'
import styles from "./AppLayout.module.css";
import { NavLink } from 'react-router-dom'
import PageNav from './PageNav';
import Sidebar from './Sidebar';
import Map from './Map';
import User from './User';
export default function AppLayout() {
  return (
    <div className={styles.app}>
        <Sidebar/>
        <Map/>
        <User/>
    </div>
  )
}
