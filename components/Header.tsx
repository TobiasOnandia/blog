export const NavItems = [
  { label: "Home", href: "/" , icons: {
  }
  },
  { label: "Posts", href: "/posts", icons: {
  }
   },
  { label: "New Post", href: "/posts/new" , icons: {
  }
  },
  { label: "Profile", href: "/profile" , icons: {
  }},
];

export const Header = () => {
  return (
    <header className="flex col-span-2 items-center gap-12  justify-between border-b border-neutral-200 py-4">
      <h1 className="text-2xl px-4">Blog</h1>
      <nav className="flex-1 px-4">
        <ul
          className="flex   text-xl justify-end items-center gap-4 *:hover:text-sky-500"
        >
          {NavItems.map((item) => (
            <li className="" key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
