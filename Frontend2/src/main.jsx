import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Component1 from './Component1'
import Component2 from './Component2'
import Componente3 from './Component3'
import './index.css'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Component1/>
    <section className='Tarjetas'>
      <Componente3/>
      <Componente3/>
      <Componente3/>
      <Componente3/>
    </section>
    <Component2/>
  </StrictMode>,
)
