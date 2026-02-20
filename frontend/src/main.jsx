import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements,RouterProvider,Route,Navigate } from 'react-router-dom';
import './index.css'
import InvoiceDetails from './pages/InvoiceDetails';
import Home from './pages/Home';



const Router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home/>}>
      <Route path="/invoices/:id" element={<InvoiceDetails/>}/>
      <Route path="*" element={<Navigate to="/"/>}/>
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Router}/>
  </StrictMode>,
)
