import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export const config = {
   matcher: [],
};

export default function middleware(req: any) {
   return withAuth(req);
}
