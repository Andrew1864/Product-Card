import "./index.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Hello World</h1>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
