import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JoinPage from './pages/JoinPage';
import NewsPost from './pages/NewsPost'; // <--- Import the new page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/join" element={<JoinPage />} />
        {/* The :slug part is dynamic (e.g., /news/my-article) */}
        <Route path="/news/:slug" element={<NewsPost />} /> 
      </Routes>
    </Router>
  );
}

export default App;