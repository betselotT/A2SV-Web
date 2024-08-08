"use client";
import React, { useEffect, useState } from "react";
import OTP from "./OTP";
import axios, { isAxiosError } from "axios";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

const Verify = () => {
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const router = useRouter();
  const [error, setError] = useState("");
  const handleSubmit = async (pin: string) => {
    const userEmail = localStorage.getItem("userEmail");
    const formData = JSON.stringify({
      email: userEmail,
      OTP: pin.toString(),
    });
    console.log(formData);
    try {
      const response = await axios.post(
        "https://akil-backend.onrender.com/verify-email",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);

      if (response.status === 200) {
        console.log(response);
        Cookie.set("jobPlaceToken", response.data.data.refreshToken);
        router.push("/");
      }
    } catch (err) {
      console.log(err);
      if (isAxiosError(err) && err.response) {
        console.log(err.response.data.message);
        setError(err.response.data.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <div>
          <h1 className="flex items-center justify-center font-black text-2xl font-poppins pb-4">
            Verify Email
          </h1>
          <div className="pt-5 w-96">
            <p className="text-gray-400 mb-16">
              We sent a verification code to the email address you provided. To
              complete the verification process, please enter the code here.
            </p>
          </div>
          <OTP onComplete={handleSubmit} />
          <div className="pt-5 w-96">
            <p className="text-gray-400 mb-5">
              You can request to{" "}
              <button className="text-custom-blue font-semibold">
                Resend code
              </button>{" "}
              in{" "}
              <button className="text-custom-blue font-semibold">
                {formatTime(timeLeft)}
              </button>
            </p>
            {error && (
              <p className="text-red-500 text-center mt-2 mb-5">{error}</p>
            )}
          </div>
          <button className="bg-purple-200 text-white border w-96 rounded-3xl py-3 px-4 pb-3 mt-5">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verify;
