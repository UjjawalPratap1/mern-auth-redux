import { Route, Routes } from 'react-router-dom'
import Header from './components/header'
import Main from './components/main'
import Register from './components/Register'


const App = () => {
 
 
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </div>
  )
}

export default App
