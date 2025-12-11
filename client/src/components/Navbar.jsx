export default function Navbar() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/About" },
    { label: "Contact Us", href: "/Contact" },
  ];

  return (
    <nav className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-5 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="text-xl font-bold text-gray-900">
          BlogPort
        </a>

        <ul className="flex items-center gap-8 text-gray-700">
          {navItems.map((item) => (
            <li key={item.label}>
              <a href={item.href} className="hover:text-blue-500 transition">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Sign In */}
        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
          Sign in
        </button>
      </div>
    </nav>
  );
}
