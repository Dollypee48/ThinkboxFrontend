export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-10 py-6 text-sm text-gray-600">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <p className="text-center sm:text-left">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-purple-700">ThinkBox</span>. All rights reserved.
        </p>

        <div className="space-x-4">
          <a href="#" className="hover:text-purple-600 hover:underline transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-purple-600 hover:underline transition">
            Terms of Service
          </a>
          <a href="#" className="hover:text-purple-600 hover:underline transition">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
