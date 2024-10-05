'use client';

import Link from "next/link";
import { useState } from 'react';
import { useRouter } from "next/navigation";

export default function RegisterForm(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    //console.log("Name: ", name);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!name || !email || !password){
            setError("All fiels are necessary.");
            return;
        }

        try {

            const resUserExists = await fetch('api/userExists', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            const { user } = await resUserExists.json();
            
            if(user){
                setError("User already exists.");
                return;
            }

            const res = await fetch('api/register', {
               method: "POST",
               headers: {
                "Content-Type": "application/json"
               },
               body: JSON.stringify({
                name,
                email,
                password
               }) 
            });

            if(res.ok){
                const form = e.target;
                form.reset();
                router.push('/');
                
            } else {
                console.log("User registration failed.");
            }
        } catch(error){
            console.log("Error during registration: ", error);
        }
    };

    return (
        <div className="grid place-items-center h-screen">
            <div className="p-5 border-t4 border-green-400 shadow-lg rounded-lg">
                <h1 className="my-4 text-xl font-bold">Register</h1>
                <form className="flex flex-col gap-3" onSubmit={ handleSubmit }>
                    <input 
                        type="text" placeholder="Full Name" 
                        onChange={(e) => setName(e.target.value)} />
                    <input 
                        type="text" placeholder="Email" 
                        onChange={(e) => setEmail(e.target.value)} />
                    <input 
                        type="password" placeholder="Password" 
                        onChange={(e) => setPassword(e.target.value)} />
                    <button className="px-6 py-2 bg-green-600 text-white font-bold cursor-pointer">Register</button>

                    { 
                        error && (
                            <div className="mt-2 px-3 py-1 w-fit bg-red-500 text-white text-sm rounded-md">{ error }</div>
                        )
                    }

                    <Link
                        className="mt-3 text-sm text-right font-bold"
                        href={'/'}>Already have an account? <span className="underline">Login</span>
                    
                    </Link>
                </form>
            </div>
        </div>
    );
}