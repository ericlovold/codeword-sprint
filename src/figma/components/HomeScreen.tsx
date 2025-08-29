import newCodewordIcon from 'figma:asset/57a835907c65cc5c6d0ea04a03fdba5d1830d273.png';

export function HomeScreen() {
  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: '#642975' }}>
      {/* Main content area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="text-center space-y-8 max-w-sm">
          {/* Codeword Logo */}
          <div className="flex justify-center">
            <img 
              src={newCodewordIcon} 
              alt="Codeword" 
              className="w-32 h-32 object-contain"
            />
          </div>
          
          {/* Welcome Text */}
          <div className="space-y-4">
            <h1 className="text-3xl font-medium text-white chat-text">
              Welcome to Codeword
            </h1>
            <p className="text-base text-white chat-text leading-relaxed opacity-90">
              Your AI companion for emotional support, crisis intervention, and navigating life's challenges.
            </p>
          </div>
          
          {/* Get Started Message */}
          <p className="text-base text-white chat-text opacity-90">
            Tap the center button below to start a conversation with your Codeword Companion Coach
          </p>
        </div>
      </div>
    </div>
  );
}