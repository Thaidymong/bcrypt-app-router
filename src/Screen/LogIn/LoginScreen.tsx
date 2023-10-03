"use client";
import { MUTATION_SIGNIN } from "@/graphql";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";

export default function LoginScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signin] = useMutation(MUTATION_SIGNIN);
  const router = useRouter();

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    signin({
      variables: {
        input: {
          email,
          password,
        },
      },
      onCompleted:(data)=>{
        if(data?.signIn?.token){
          Cookie.set("token",data?.signIn?.token,{expires: 1});
          router.push("/");
        }
      }
    });
  };
  return (
    <>
      <div className="flex items-center justify-center h-screen w-full">
        <div className="flex text-center border rounded-lg shadow-md">
          <div className="mr-8">
            <Image
              src="/image-1.webp"
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </div>
          <div>
            <div className="flex items-center justify-center pt-4">
              <Image
                src="/logo.png"
                width={100}
                height={100}
                alt="Picture of the author"
              />
            </div>
            <form onSubmit={handleSubmit} className="ml-4 mr-[40px] mt-4">
              <div className="pt-2">
                <label
                  htmlFor=""
                  className="flex text-left text-sm text-slate-500"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="border-slate-300 mt-[5px] w-full h-[40px] rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative pt-4">
                <label
                  htmlFor=""
                  className="flex text-left text-sm text-slate-500"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  data-tooltip-target="tooltip-password"
                  className="border-slate-300 mt-[5px] w-full h-[40px] rounded-md text-xs"
                  type={isVisible ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="text-gray-600 absolute right-2.5 bottom-2.5 font-sm"
                >
                  {isVisible ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              <div className="flex items-center justify-between pt-[30px]">
                <div>
                  <input
                    type="checkbox"
                    className="border-slate-300 w-[22px] h-[22px] rounded-sm"
                  />
                  <label
                    htmlFor=""
                    className="pl-3 text-center text-sm text-slate-500"
                  >
                    Remember this Device
                  </label>
                </div>
                <div>
                  <Link
                    className="text-blue-400 no-underline ml-1 text-sm"
                    href="#"
                  >
                    Forgot Password ?
                  </Link>
                </div>
              </div>

              <div className="pb-[20px] px-[0px] pt-[30px]">
                <button
                  className="bg-[#93D94E] w-full rounded-md py-[10px] px-[12px]"
                  type="submit"
                >
                  <span className="text-center text-gray-50 text-sm">
                    Sign In
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
