"use client";

import Link from "next/link";
import { useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false
            });

            if(res.error){
                setError("Invalid Credentials");

                return;
            }
            
            router.replace("dashboard");

        } catch(error){
            console.log(error);
        }
    }

    return (
        <div className="grid place-items-center h-screen">
            <div className="p-5 border-t-4 border-green-400 shadow-lg rounded-lg">
                <h1 className="my-4 text-xl font-bold">Login</h1>

                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value) } />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value) } />
                    <button className="px-6 py-2 bg-green-600 text-white font-bold cursor-pointer">Login</button>
                    
                    { error && (
                        <div className="mt-2 px-3 py-1 w-fit bg-red-500 text-white text-sm rounded-md">{ error }</div>
                    )}

                    <Link 
                        className="mt-3 text-sm text-right font-bold"
                        href={'/register'}>Don't have an account? <span className="underline">Register</span>
                    </Link>
                </form>

            </div>
        </div>
    )
}