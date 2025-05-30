import React from 'react';
import Styles from './Button.module.css';
export default function Button({children,onClick,type}) {
  return (<button onClick={onClick} type={type} className={ `${Styles.btn} ${Styles[type]}`}>{children}</button>);}
