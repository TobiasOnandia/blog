import { PostDisplay } from "@/components/posts/view/ById/PostDisplay";
import { postById } from "@/server/posts/postById";

export default async function PostDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postData = await postById({ id });
  return <PostDisplay post={postData} id={id} />;
}
