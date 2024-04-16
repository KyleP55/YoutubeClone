import ReactDom from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserContext from './context/userContext.js';

// Pages
import Header from './components/ui/Header';
import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';
import UploadPage from './pages/UploadPage';

import CreateAccountPage from './pages/CreateAccountPage';

function App() {

  return (
    <UserContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<HomePage />} />
            <Route path={"video/:id"} element={<VideoPage />} />
            <Route path={"account/login"} element={<CreateAccountPage />} />
            <Route path={"upload"} element={<UploadPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext>
  );
}

export default App;
