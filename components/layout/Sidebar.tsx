export const Sidebar = () => {
  return (
    <aside className=" py-12 max-w-[240px] w-full font-courier-prime sticky top-0 ">
      <nav>
        <ul className="space-y-6">
          <li>
            <button
              className="w-full text-left py-2 hover:pl-4 transition-all duration-300 
                              border-l-2 border-transparent hover:border-black
                              text-lg tracking-wide uppercase"
            >
              View all
            </button>
          </li>
          <li>
            <button
              className="w-full text-left py-2 hover:pl-4 transition-all duration-300 
                              border-l-2 border-transparent hover:border-black
                              text-lg tracking-wide uppercase"
            >
              Design
              <span className="block text-sm font-normal normal-case mt-1 text-gray-500">
                Teoría y práctica visual
              </span>
            </button>
          </li>
          <li>
            <button
              className="w-full text-left py-2 hover:pl-4 transition-all duration-300 
                              border-l-2 border-transparent hover:border-black
                              text-lg tracking-wide uppercase"
            >
              Product
              <span className="block text-sm font-normal normal-case mt-1 text-gray-500">
                Innovación tangible
              </span>
            </button>
          </li>
          <li>
            <button
              className="w-full text-left py-2 hover:pl-4 transition-all duration-300 
                              border-l-2 border-transparent hover:border-black
                              text-lg tracking-wide uppercase"
            >
              Business
              <span className="block text-sm font-normal normal-case mt-1 text-gray-500">
                Estrategias modernas
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
