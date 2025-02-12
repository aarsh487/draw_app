"use client";
import React, { useCallback, useState } from "react";
import { Input } from "../../../ui/Input";
import { Button } from "../../../ui/Button";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { axiosInstance } from "../../../config";
import { useRouter } from "next/navigation";
import axios from "axios";

function page() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const onSubmit = useCallback(async () => {
    setIsSubmitting(true);

    try {
      const result = await axiosInstance.post("/signin", form);

      if (result.data.success) {
        router.push("/dashboard");
        setForm({ email: "", password: "" });
      } else {
        console.error("Login failed:", result.data.message);
        alert(result.data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
        alert(
          error.response?.data?.message || "Network error. Please try again."
        );
      } else {
        console.error("Unexpected error:", error);
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [form, router]);
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="max-h-96 w-[450px] bg-white rounded-xl p-10">
        <div className="flex flex-col justify-center items-center gap-1 text-black">
          <h1 className={twMerge("text-2xl font-semibold ")}>
            Sign in to your account
          </h1>
          <p className="text-black/90">
            Or{" "}
            <span className={twMerge("text-sm text-primary")}>
              <Link href="/signup">create a new account</Link>
            </span>
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 mt-4">
          <Input
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            type="text"
            placeholder="Email"
          />
          <Input
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            type="text"
            placeholder="Password"
          />
          <Button
            disabled={isSubmitting}
            onClick={onSubmit}
            size="lg"
            variant="primary"
          >
            Create account
          </Button>
        </div>
      </div>
    </div>
  );
}

export default page;
