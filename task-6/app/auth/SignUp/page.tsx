"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import * as z from "zod";
import axios, { AxiosError, isAxiosError } from "axios";
import { signupSchema } from "@/schema/schema";
import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: FormValues) => {
    localStorage.setItem("userEmail", data.email);
    const formData = JSON.stringify({ ...data, role: "" });
    try {
      const response = await axios.post(
        "https://akil-backend.onrender.com/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      router.push("/auth/verify-email");

      if (response.status === 200) {
        console.log("Success");
      } else {
        console.log();
        setError("");
      }
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        console.log(err.response.data.message);
        setError(err.response.data.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
    }
  };

  const handleGoogleSignUp = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="flex items-center justify-center">
      <div>
        <h1 className="flex items-center justify-center font-black text-2xl font-poppins pb-4">
          Sign Up Today!
        </h1>
        <button className="flex items-center justify-center gap-2 border w-96 rounded-md py-3 px-4 pb-3">
          <Google />
          <p
            className="font-bold text-custom-blue"
            onClick={handleGoogleSignUp}
          >
            Sign Up with Google
          </p>
        </button>
        <div className="flex items-center mt-5 text-sm">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="px-3 text-gray-500">Or Sign Up with Email</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-2">
            <p className="pb-2 text-gray-600 font-bold">Full Name</p>
            <input
              className="border w-96 rounded-md py-3 px-4"
              type="text"
              placeholder="Enter your full name"
              {...register("name")}
            />
            <p className="text-red-500 text-center mt-2">
              {errors.name?.message}
            </p>
          </div>
          <div className="py-2">
            <p className="pb-2 text-gray-600 font-bold">Email Address</p>
            <input
              className="border w-96 rounded-md py-3 px-4"
              type="email"
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
              type="password"
              placeholder="Enter password"
              {...register("password")}
            />
            <p className="text-red-500 text-center mt-2">
              {errors.password?.message}
            </p>
          </div>
          <div className="py-2">
            <p className="pb-2 text-gray-600 font-bold">Confirm Password</p>
            <input
              className="border w-96 rounded-md py-3 px-4"
              type="password"
              placeholder="Enter password"
              {...register("confirmPassword")}
            />
            <p className="text-red-500 text-center mt-2">
              {errors.confirmPassword?.message}
            </p>
          </div>
          {error && (
            <p className="text-red-500 text-center mt-2 mb-5">{error}</p>
          )}
          <button className="bg-darker-blue text-white border w-96 rounded-3xl py-3 px-4 pb-3 mt-5">
            Continue
          </button>
        </form>
        <div className="flex mt-4 gap-3">
          <p className="text-gray-500">Already have an account?</p>
          <Link href="/auth/SignIn">
            <button className="text-custom-blue font-bold">Login</button>
          </Link>
        </div>
        <div className="pt-5 w-96">
          <p className="text-gray-400 mb-5">
            By clicking 'Continue', you acknowledge that you have read and
            accepted our{" "}
            <button className="text-custom-blue font-semibold">
              Terms of Service
            </button>{" "}
            and{" "}
            <button className="text-custom-blue font-semibold">
              Privacy Policy.
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

function Google() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="20"
      height="20"
      viewBox="0 0 48 48"
    >
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      ></path>
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      ></path>
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
    </svg>
  );
}

export default SignUp;
