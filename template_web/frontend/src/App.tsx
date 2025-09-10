import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import TemplateListPage from './components/TemplateListPage'
import ProductDetailPage from './components/ProductDetailPage'


function App() {
  return (
    <div>
       <BrowserRouter>
          <Header/>
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path="/templates/:techStack" element={<TemplateListPage />} />
              <Route path="/product/:productId" element={< ProductDetailPage/>} />
          </Routes>
          <Footer/>
       </BrowserRouter>
    </div>
  )
}

export default App
