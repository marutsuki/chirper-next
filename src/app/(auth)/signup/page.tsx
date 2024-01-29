"use client";

export default function Page() {
    return <main className="h-screen grid place-items-center">
        <form action="/api/auth/signup" method="post" className="flex flex-col">
            <input name="email" type="text" placeholder="Email"/>
            <input name="password" type="password" placeholder="Password"/>
            <button type="submit">Sign Up</button>
        </form>
    </main>
}