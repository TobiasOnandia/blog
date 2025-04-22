export const NavItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Posts", href: "/posts" },
  { label: "New Post", href: "/posts/new" },
  { label: "Profile", href: "/profile" },
];

export const Header = () => {
  return (
    <header className="flex items-center gap-12  justify-between border-b border-neutral-200 py-4">
      <h1 className="text-2xl px-4">Blog</h1>

      <nav className="flex-1 px-4">
        <ul
          className="flex  text-xl justify-end items-center gap-4 *:hover:text-sky-500 
          "
        >
          {NavItems.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
