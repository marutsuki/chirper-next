"use server";

import { defaultRouteConfig } from "@/route-config";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const reqUrl = new URL(req.url);
    const data = await req.formData();
    const email = data.get("email");
    const password = data.get("password");

    if (email !== null && password !== null) {
        console.info("Creating user for email:", email);
        const supabase = createRouteHandlerClient({ cookies })
        try {
            const { data, error } = await supabase.auth.signUp({
                email: email.toString(),
                password: password.toString(),
                options: {
                    emailRedirectTo: `${reqUrl.origin}/home`
                }
            })
            if (error !== null) {
                console.error("An error occurred calling the supabase API", error.message);
            } else {
                console.info("Created user, response:", data);
            }
            return NextResponse.redirect(reqUrl.origin.concat(defaultRouteConfig.defaultAuthenticatedPath), {
                status: 301
            });
        } catch (e: unknown) {
            console.error("An error occurred creating user", e);
        }
    }
}