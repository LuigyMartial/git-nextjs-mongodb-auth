

export default function UserInfo(){
    return (
        <div className="grid place-items-center h-screen">
            <div className="flex flex-col gap-2 my-6 p-8 bg-zince-300/10 shadow-lg">
                <div>Name: <span className="font-bold">John</span></div>
                <div>Email: <span className="font-bold">John@gmail.com</span></div>
                <button className="mt-3 px-6 py-2 bg-red-500 text-white font-bold">Log Out</button>
            </div>
        </div>
    );
}