export default function Loading() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center z-50">
      {/* Background animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 animate-pulse opacity-50"></div>
      
      {/* Main loading container */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
        {/* Logo with animations */}
        <div className="relative">
          {/* Glow effect behind logo */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F7DD0F] via-yellow-400 to-[#F7DD0F] rounded-full blur-2xl opacity-30 animate-pulse scale-150"></div>
          
          {/* Main logo */}
          <div className="relative animate-float">
            <img 
              src="/logo/dopelogo.svg" 
              alt="DopeTech Logo" 
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 animate-pulse"
            />
          </div>
          
          {/* Rotating ring effect */}
          <div className="absolute inset-0 border-2 border-[#F7DD0F] rounded-full opacity-30 animate-spin" style={{ animationDuration: '3s' }}></div>
          <div className="absolute inset-2 border border-[#F7DD0F] rounded-full opacity-20 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
        </div>
        
        {/* Loading text */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white animate-fade-in">
            DopeTech
          </h2>
          <p className="text-gray-400 text-sm sm:text-base animate-fade-in-up stagger-1">
            Loading amazing tech...
          </p>
        </div>
        
        {/* Loading dots */}
        <div className="flex space-x-2 animate-fade-in-up stagger-2">
          <div className="w-2 h-2 bg-[#F7DD0F] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-[#F7DD0F] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-[#F7DD0F] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        
        {/* Progress bar */}
        <div className="w-48 sm:w-64 md:w-80 h-1 bg-gray-700 rounded-full overflow-hidden animate-fade-in-up stagger-3">
          <div className="h-full bg-gradient-to-r from-[#F7DD0F] to-yellow-400 rounded-full animate-shimmer" style={{ width: '60%' }}></div>
        </div>
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#F7DD0F] rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
