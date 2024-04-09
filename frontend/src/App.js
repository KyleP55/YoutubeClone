import ReactDom from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages
import Header from './components/ui/Header';
import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';
import UploadPage from './pages/UploadPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<HomePage />} />
          <Route path={"video/:id"} element={<VideoPage />} />
          <Route path={"upload"} element={<UploadPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
