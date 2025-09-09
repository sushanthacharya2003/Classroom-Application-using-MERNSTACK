import {useState} from React;
import {useAuth} from "../context/AuthContext";

export default function login(){
    const {login}=useAuth();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const submit=async(e)=>{
        e.preventDefault();
        await login(email,password);
    };
    return(
         <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="w-80 space-y-3">
        <h1 className="text-2xl font-bold">Login</h1>
        <input className="border p-2 w-full" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input className="border p-2 w-full" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
        <button className="w-full bg-black text-white p-2">Sign in</button>
      </form>
    </div>
    );
}