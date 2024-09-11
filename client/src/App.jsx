import Home from '../routes/homePage/Home'
import './App.scss'
import Navbar from './components/navbar/Navbar'

function App() {

  return (
    <div className='layout'>
      <Navbar />
      <Home />
    </div>

    
  )
}

export default App
