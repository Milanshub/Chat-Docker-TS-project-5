import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import NotFoundPage from './pages/NotFoundPage';
import ChatPage from './pages/ChatPage';


const App: React.FC = () => {
  return (
    <div className="App">
     <Router>
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
     </Router> 
    </div>
  );
}

export default App;
