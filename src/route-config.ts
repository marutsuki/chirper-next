export type RouteConfig = {
    unauthenticatedPaths: string[];
    defaultAuthenticatedPath: string;
    defaultUnauthenticatedPath: string;
}

/**
 * Configuration for routes in the context of authentication.
 */
export const defaultRouteConfig: RouteConfig = {
    unauthenticatedPaths: ["/", "/signin", "/signup"],
    defaultAuthenticatedPath: "/home",
    defaultUnauthenticatedPath: "/signin"
}