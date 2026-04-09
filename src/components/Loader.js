'use client';

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 shadow-2xl">
        <div className="flex flex-col items-center gap-4">
          {/* Animated Elevator Icon */}
          <div className="relative w-16 h-20 border-2 border-yellow-700 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-700 to-yellow-600 animate-pulse" style={{
              animation: 'elevatorMove 2s ease-in-out infinite'
            }} />
            <style>{`
              @keyframes elevatorMove {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(40px); }
              }
            `}</style>
          </div>
          
          <p className="text-gray-900 font-semibold text-lg">جاري التحميل...</p>
          <p className="text-gray-500 text-sm">برجاء الانتظار قليلاً</p>
        </div>
      </div>
    </div>
  );
}
