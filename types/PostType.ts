import { AppRouter } from "@/server/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

type RouterOutput = inferRouterOutputs<AppRouter>;
type PostType = RouterOutput["post"]["byId"];

type PostAllType = RouterOutput["post"]["list"]["posts"][number];
interface ViewAllPost {
  post: PostAllType;
}
export type { PostType, ViewAllPost };
