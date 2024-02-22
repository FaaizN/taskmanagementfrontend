import './App.css';
import Tasks from './pages/tasks';
import Home from './pages/home';
import NoPage from './pages/noPage';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import * as React from 'react';

export function App() {
  const [userName, setUserName] = React.useState("")
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route index element = {<Home userName={userName} setUserName={setUserName}/>} />
            <Route path="/tasks" element={<Tasks userName={userName} />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </AuthProvider>  
      </BrowserRouter>
      
    </div>

  );
}

export default App;
