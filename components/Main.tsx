
export const Posts = [
    {
        id: 1,
        title: "Robo en Argentina",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
    },
    {
        id: 2,
        title: "Robo en Argentina",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
    },
    {
        id: 3,
        title: "Robo en Argentina",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
    }
]

export const Main = () => {
    return (
        <main className="grid grid-cols-3 gap-4 border   mx-8 place-content-center">
            {Posts.map((post) => (
                <figure key={post.id} className="bg-neutral-50 h-fit border border-neutral-200 w-full p-4">
                    <img src="#" alt="foto" />
                    <figcaption>{post.title}</figcaption>
                </figure>
            ))}
        </main>
    )
}