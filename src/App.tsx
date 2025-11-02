import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewsPage from "./news/page";
import FavoriteList from "./favoriteList/page";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/newsPage" element={<NewsPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/favoriteList" element={<FavoriteList />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
