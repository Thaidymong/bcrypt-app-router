"use client";
import LoginScreen from "@/Screen/LogIn/LoginScreen";
import { QUERY_USERS } from "@/graphql";
import { useQuery } from "@apollo/client";
import { verify } from "jsonwebtoken";
// import { cookies } from "next/headers";
import { redirect, useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Home() {
  // const cookieStore = cookies();
  // const token: any = cookieStore.get("token");
  // const user = verify(token?.value, "iamdymong");
  // redirect("/login");
const router = useRouter();

  const handleLogout=()=>{
    Cookies.remove("token");
    router.push("/auth/login");
  }
  const {data} = useQuery(QUERY_USERS);
  console.log(data)
  return(
    <>
      {/* <LoginScreen /> */}
      <p>home</p>
      <button
        onClick={()=>handleLogout()}
      >Logout</button>
    </>
  )
  
}
