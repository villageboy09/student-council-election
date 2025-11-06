const Header = () => {
  return (
    <header className="bg-card border-b shadow-sm py-3 sm:py-4 px-4 sm:px-6 mb-4 sm:mb-8">
      <div className="container max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* VGU Logo - Left */}
        <div className="flex items-center flex-shrink-0">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-vgu-blue rounded-full flex items-center justify-center text-white font-bold text-base sm:text-xl shadow-lg">
            VGU
          </div>
        </div>

        {/* Title - Center */}
        <div className="text-center flex-1 min-w-0">
          <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-vgu-blue truncate">
            Student Council Election 2025
          </h1>
        </div>

        {/* Student Council Logo - Right */}
        <div className="flex items-center flex-shrink-0">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-vgu-gold rounded-full flex items-center justify-center text-vgu-blue font-bold text-base sm:text-xl shadow-lg">
            SC
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
