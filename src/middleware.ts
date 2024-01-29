import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextRequest, NextResponse } from "next/server";
import { defaultRouteConfig } from "./route-config";

/**
 * Middleware to manage authentication via Supabase.
 * 
 * @param req the incoming request to intecept
 * @returns a response, potentially a redirect
 */
export async function middleware(req: NextRequest): Promise<NextResponse> {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    const { data: { user } } = await supabase.auth.getUser();

    console.debug("Middleware ::: Received request from user:", user?.id)
    const isAccessingUnauthPath = defaultRouteConfig.unauthenticatedPaths.includes(req.nextUrl.pathname)

    if (user !== null && isAccessingUnauthPath) {
        return NextResponse.redirect(new URL(defaultRouteConfig.defaultAuthenticatedPath, req.url));
    }

    if (user === null && !isAccessingUnauthPath) {
        console.log('got here');
        return NextResponse.redirect(new URL(defaultRouteConfig.defaultUnauthenticatedPath, req.url));
    }

    return res;
}

export const config = {
    matcher: ["/(.*)"]
}