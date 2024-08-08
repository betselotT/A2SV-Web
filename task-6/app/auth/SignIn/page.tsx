"use client";
import Link from "next/link";
import React, { useState } from "react";
import axios, { isAxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signinSchema } from "@/schema/schema";
import Cookie from "js-cookie";
import { signIn } from "next-auth/react";

interface FormValues {
  email: string;
  password: string;
}

const SignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: FormValues) => {
    const formData = JSON.stringify(data);
    setLoading(true);
    try {
      const response = await axios.post(
        "https://akil-backend.onrender.com/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);

      if (response.status === 200) {
        console.log(response);
        Cookie.set("jobPlaceToken", response.data.data.refreshToken);
        router.push("/");
      } else {
        console.log("Something went wrong");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (isAxiosError(err) && err.response) {
        console.log(err.response.data.message);
        setError(err.response.data.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <div>
          <h1 className="flex items-center justify-center font-black text-2xl font-poppins pb-4">
            Welcome back!
          </h1>
          <div className="flex items-center mt-5 text-sm">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="px-3 text-gray-500">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-2">
              <p className="pb-2 text-gray-600 font-bold">Email Address</p>
              <input
                className="border w-96 rounded-md py-3 px-4"
                type="text"
                placeholder="Enter email address"
                {...register("email")}
              />
              <p className="text-red-500 text-center mt-2">
                {errors.email?.message}
              </p>
            </div>
            <div className="py-2">
              <p className="pb-2 text-gray-600 font-bold">Password</p>
              <input
                className="border w-96 rounded-md py-3 px-4"
                type="text"
                placeholder="Enter password"
                {...register("password")}
              />
              <p className="text-red-500 text-center mt-2">
                {errors.password?.message}
              </p>
            </div>
            {error && (
              <p className="text-red-500 text-center mt-2 mb-5">{error}</p>
            )}
            <button className="bg-darker-blue text-white border w-96 rounded-3xl py-3 px-4 pb-3 mt-5">
              Login
            </button>
          </form>
          <div className="flex mt-4 gap-3">
            <p className="text-gray-500">Don't have an account?</p>
            <Link href="/auth/SignUp">
              <button className="text-custom-blue font-bold">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
