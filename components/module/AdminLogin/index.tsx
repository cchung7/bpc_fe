"use client";

import PHInput from "@/components/form/NRInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";

type LoginFormValues = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const AdminLogin = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="relative min-h-screen w-full">
      <Image
        src="/images/admin-banner1.jpg"
        alt="Tennis Background"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl bg-white/95 p-8 shadow-2xl">
          <h2 className="text-center text-2xl font-semibold text-gray-900">
            Welcome Back
          </h2>
          <p className="mb-8 mt-2 text-center text-sm text-gray-600">
            Sign in to your admin account
          </p>

          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <PHInput
                control={form.control}
                name="email"
                label="Email"
                type="email"
                placeholder="admin@example.com"
              />

              <PHInput
                control={form.control}
                name="password"
                label="Password"
                type="password"
                placeholder="••••••••"
              />

              <Link href="/admin/dashboard">
                <Button
                  type="submit"
                  className="w-full py-6 text-base font-semibold"
                >
                  Sign In
                </Button>
              </Link>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;