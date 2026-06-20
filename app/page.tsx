export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white p-4">
      <div className="max-w-3xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h1 className="text-4xl font-bold text-green-900 mb-2">NaCCA QR Portal</h1>
          <p className="text-xl text-gray-600">National Council for Curriculum and Assessment</p>
          
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-xl p-4">
              <div className="text-3xl mb-2">📱</div>
              <h3 className="font-semibold">Scan QR Code</h3>
              <p className="text-sm text-gray-600">Verify NaCCA approved materials</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <div className="text-3xl mb-2">✓</div>
              <h3 className="font-semibold">Instant Verification</h3>
              <p className="text-sm text-gray-600">Get book details instantly</p>
            </div>
          </div>
          
          <div className="mt-8 text-sm text-gray-500">
            <p>🚀 Ready for QR verification!</p>
          </div>
        </div>
      </div>
    </div>
  );
}