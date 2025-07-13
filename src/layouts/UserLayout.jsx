export default function UserLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      <main className="flex-grow px-6 py-10">{children}</main>
    </div>
  );
}