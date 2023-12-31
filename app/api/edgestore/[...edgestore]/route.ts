import { db } from "@/lib/db";
import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
type Context = {
   userId: string;
};
const es = initEdgeStore.context<Context>().create();

const createContext = async (): Promise<Context> => {
   const { getUser } = getKindeServerSession();
   const user = await getUser();

   if (!user || !user.id) throw new Error("Unauthorized");
   return { userId: user.id };
};

const edgeStoreRouter = es.router({
   publicPdfUploader: es
      .fileBucket({
         accept: ["application/pdf"],
         maxSize: 1024 * 1024 * 4,
      })
      .beforeUpload(async ({ ctx }) => {
         const filesAmount = await db.file.count({
            where: {
               userId: ctx.userId,
            },
         });
         if (filesAmount >= 5) return false;

         return true;
      })
      .beforeDelete(() => true)
      .metadata(({ ctx }) => ({
         userId: ctx.userId,
      })),
   // TODO add Pro Plan router
});
const handler = createEdgeStoreNextHandler({
   router: edgeStoreRouter,
   createContext,
});
export { handler as GET, handler as POST };
export type EdgeStoreRouter = typeof edgeStoreRouter;
