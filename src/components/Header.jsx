const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6 mb-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* VGU Logo - Left */}
        <div className="flex items-center">
          <div className="w-16 h-16 bg-vgu-blue rounded-full flex items-center justify-center text-white font-bold text-xl">
            VGU
          </div>
        </div>

        {/* Title - Center */}
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-vgu-blue">
            Student Council Election 2025
          </h1>
        </div>

        {/* Student Council Logo - Right */}
        <div className="flex items-center">
          <div className="w-16 h-16 bg-vgu-gold rounded-full flex items-center justify-center text-vgu-blue font-bold text-xl">
            SC
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
