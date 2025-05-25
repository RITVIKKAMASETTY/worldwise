import React from 'react'
import styles from "./AppLayout.module.css";
import { NavLink } from 'react-router-dom'
import PageNav from './PageNav';
import Sidebar from './Sidebar';
import Map from './Map';
export default function AppLayout() {
  return (
    <div className={styles.app}>
        <Sidebar/>
        <Map/>
    </div>
  )
}
