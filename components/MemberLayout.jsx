import ProtectedRoute from './ProtectedRoute';
import NavBar from './NavBar';

export default function MemberLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#F8F6FB]">
        <NavBar />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
