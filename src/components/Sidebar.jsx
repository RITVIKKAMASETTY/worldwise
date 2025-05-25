import React from 'react'
import PageNav from './PageNav'
import Logo from './Logo'
import styles from "./Sidebar.module.css";
import { Outlet } from 'react-router-dom';
import App from '../App';
import AppNav from './AppNav';
export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
    <Logo/>
    <AppNav/>
    <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} by WorldWide. All rights reserved.
        </p>
        </footer>
      </div>
  )
}