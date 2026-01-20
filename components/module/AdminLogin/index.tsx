/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PHInput from "@/components/form/NRInput";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/src/redux/api/authApi";
import { setUser } from "@/src/redux/features/authSlice";
import { useAppDispatch } from "@/src/redux/hooks";

import { setCookie } from "@/src/utils/cookies";
import { zodResolver } from "@hookform/resolvers/zod";
import { jwtDecode, JwtPayload } from "jwt-decode";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type LoginFormValues = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 6 characters"),
});

const AdminLogin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation() as any;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    console.log("Login Data:", data);
    try {
      const res = await login(data).unwrap();

      if (res.success && res.data?.token) {
        const token = res.data.token;
        setCookie(token);
        const user = jwtDecode<JwtPayload>(token);

        dispatch(setUser({ token, user }));
        toast.success(res.message || "Login successful!");
        router.push("/admin/dashboard");
      } else {
        toast.error(res.message || "Login failed");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      <Image
        src="/images/admin-banner1.jpg"
        alt="Pickleball Background"
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

              <Button
                type="submit"
                className="w-full py-6 text-base font-semibold"
              >
                Sign In
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
