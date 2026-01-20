/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGetMeQuery, useUpdateUserMutation } from "@/src/redux/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Camera,
  Check,
  ChevronDown,
  Mail,
  Pencil,
  Phone,
  User,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

interface InitialData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  birthday?: string;
  profileImage?: string;
  skillLevel?: string;
}

const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters"),
  birthday: z.string().optional(),
  profileImage: z.string().optional(),
  skillLevel: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();
  const { data: userData } = useGetMeQuery<InitialData>({}) as any;
  const initialData = userData?.data;

  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.profileImage || "/placeholder.svg"
  );

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      email: initialData?.email || "",
      phoneNumber: initialData?.phoneNumber || "",
      birthday: initialData?.birthday || "",
      profileImage: initialData?.profileImage || "",
      skillLevel: initialData?.skillLevel || "",
    },
  });

  useEffect(() => {
    if (userData?.data) {
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        birthday,
        profileImage,
        skillLevel,
      } = userData?.data;

      form.reset({
        firstName,
        lastName,
        email,
        phoneNumber,
        birthday: birthday || "",
        profileImage: profileImage || "",
        skillLevel: skillLevel || "",
      });

      setImagePreview(profileImage || "/placeholder.svg");
    }
  }, [userData, form]);

  async function onSubmit(data: ProfileFormValues) {
    console.log("data", data);

    const formData = new FormData();

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("skillLevel", data.skillLevel || "");

    try {
      const res = (await updateProfile(formData).unwrap()) as any;
      if (res.success) {
        toast.success(res.message || "Profile updated successfully");
      }
    } catch (error: any) {
      const err = error?.data?.message || "Something went wrong";
      console.error("Submit failed:", err);
      toast.error(error?.data?.message || "Failed to update profile");
    }

    setIsEditing(false);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="mb-8 text-3xl font-bold text-[#2D1A22]">Profile</h1>

      <Card className="mx-auto max-w-2xl border-none bg-[#F9F4EE] shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <CardTitle className="text-lg font-semibold text-[#4A3A3A]">
            Personal Info
          </CardTitle>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-green-600 hover:text-green-700"
                  onClick={form.handleSubmit(onSubmit)}
                >
                  <Check className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-600 hover:text-red-700"
                  onClick={() => {
                    setIsEditing(false);
                    form.reset();
                  }}
                >
                  <X className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#4A3A3A]"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="h-5 w-5" />
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <div className="mb-8 flex flex-col items-center">
            <div className="relative group">
              <Avatar className="h-32 w-32 border-4 border-white shadow-sm overflow-hidden">
                <AvatarImage
                  src={imagePreview as string}
                  alt="Profile"
                  className="object-cover"
                />
                <AvatarFallback className="bg-[#E5DACE] text-[#4A3A3A]">
                  {initialData?.firstName?.[0] || "U"}
                  {initialData?.lastName?.[0] || ""}
                </AvatarFallback>
              </Avatar>

              {isEditing && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Camera className="h-8 w-8" />
                </button>
              )}

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
                disabled={!isEditing}
              />
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* First Name Field */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            {...field}
                            disabled={!isEditing}
                            placeholder="First Name"
                            className="h-12 border-none bg-white pl-10 focus-visible:ring-1 focus-visible:ring-[#A3B3AA] disabled:opacity-75 disabled:cursor-not-allowed"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Last Name Field */}
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            {...field}
                            disabled={!isEditing}
                            placeholder="Last Name"
                            className="h-12 border-none bg-white pl-10 focus-visible:ring-1 focus-visible:ring-[#A3B3AA] disabled:opacity-75 disabled:cursor-not-allowed"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            {...field}
                            disabled
                            placeholder="Email"
                            className="h-12 border-none bg-white pl-10 focus-visible:ring-1 focus-visible:ring-[#A3B3AA] disabled:opacity-75 disabled:cursor-not-allowed"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Phone Number Field */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            {...field}
                            disabled={!isEditing}
                            placeholder="Phone Number"
                            className="h-12 border-none bg-white pl-10 focus-visible:ring-1 focus-visible:ring-[#A3B3AA] disabled:opacity-75 disabled:cursor-not-allowed"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="skillLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Zap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <select
                            {...field}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a4d65e] focus:border-transparent outline-none transition-all appearance-none bg-white"
                            disabled={!isEditing}
                          >
                            <option value="">Select skill level</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                            <option value="expert">Expert</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-4">
                {isEditing ? (
                  <Button
                    type="submit"
                    className="w-full h-14 bg-[#A3B3AA] text-white hover:bg-[#8F9F97] transition-colors text-lg font-medium shadow-none rounded-xl"
                  >
                    {isLoading ? "Saving..." : "Save"}
                  </Button>
                ) : (
                  <Link href="/change-password">
                    <Button
                      type="button"
                      className="w-full h-14  text-white  transition-colors text-lg font-medium shadow-none rounded-xl"
                    >
                      Change password
                    </Button>
                  </Link>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
