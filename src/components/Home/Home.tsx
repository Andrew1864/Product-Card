const Home = () => {
  return (
    <div className="min-h-full flex items-center justify-center py-8 px-4 mx-auto max-w-screen-xl">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white">
          Новости
        </h1>
        <p className="mb-6 max-w-2xl mx-auto font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
          Самые свежие и интересные новости из мира технологий, науки и инноваций. 
          Будьте в курсе событий, которые меняют наш мир.
        </p>
        <div className="mt-8">
          <div className="flex justify-center">
            <div>
              <span className="font-sans text-4xl font-black">200+</span>
              <p className="text-gray-500 mt-2">Разных новостей</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;