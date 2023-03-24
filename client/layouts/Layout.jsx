import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';
import './contenedor.css'

export default function Layout() {
  return (
    <>
    <div className='contenedor'>
    <Navbar />
      <div id="detail">
        <Outlet />
      </div>
    </div>

    </>
  );
}
