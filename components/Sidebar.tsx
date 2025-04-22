export const Sidebar = () => {
    return (
        <aside className="px-4 py-12  w-fit">
            <nav>
                <ul className="*:hover:text-sky-700 space-y-4">
                    <li>
                        <button className="cursor-pointer">View all</button>
                    </li>
                    <li>
                        <button className="cursor-pointer">
                        Design
                        </button>
                    </li>
                    <li>
                        <button className="cursor-pointer">Product</button>
                    </li>
                    <li>
                        <button className="cursor-pointer">Business</button>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}