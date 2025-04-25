import { AppRouter } from "@/server/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

type RouterOutput = inferRouterOutputs<AppRouter>;
type PostType = RouterOutput["post"]["byId"];

export type { PostType };
