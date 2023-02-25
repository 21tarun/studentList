
import './App.css';
import {Routes,Route} from 'react-router-dom'

import Login from './components/Login'
import Students  from './components/Students';
import AddStudent from './components/AddStudent'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/students' element={<Students />}/>
        <Route path='/add' element={<AddStudent />}/>
      </Routes>
    </div>
  );
}

export default App;
