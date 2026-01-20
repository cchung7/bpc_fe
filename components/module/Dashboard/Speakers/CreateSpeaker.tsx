/* eslint-disable react-hooks/refs */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import PHInput from "@/components/form/NRInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { useCreateSpeakerMutation } from "@/src/redux/api/eventApi";

import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  banner: z.any().optional(),
});

type EventFormValues = z.infer<typeof formSchema>;

export function CreateSpeakerForm() {
  const router = useRouter();
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const [createSpeaker, { isLoading }] = useCreateSpeakerMutation();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      name: "",
      description: "",
      banner: undefined,
    },
  });

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    form.setValue("banner", file);
    setBannerPreview(URL.createObjectURL(file));
  };

  const removeBanner = () => {
    form.setValue("banner", undefined);
    setBannerPreview(null);
    if (bannerInputRef.current) bannerInputRef.current.value = "";
  };

  const onSubmit = async (values: EventFormValues) => {
    try {
      const formData = new FormData();

      const payload = {
        name: values.name,
        description: values.description,
      };

      formData.append("data", JSON.stringify(payload));

      if (values.banner instanceof File) {
        formData.append("image", values.banner);
      }

      const res = (await createSpeaker(formData).unwrap()) as any;

      if (res?.success) {
        toast.success(res.message || "Created successfully");
        router.push("/admin/dashboard/speakers");
        form.reset();
        removeBanner();
      }
    } catch (error: any) {
      console.error("Submit failed:", error);
      toast.error(error?.data?.message || "Failed to create event");
    }
  };

  return (
    <div className="mx-auto container px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
          Create New Speaker/Event
        </h1>
        <p className="text-sm text-muted-foreground">
          Fill in the details to create a new speaker/event
        </p>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="border-b py-4">
          <CardTitle className="text-base sm:text-lg font-medium">
            Speaker/Event Details
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-4 sm:pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <PHInput
                control={form.control}
                name="name"
                label="Name"
                type="text"
                placeholder="Enter Name..."
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write description..."
                        className="min-h-32 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel>Upload Image</FormLabel>

                <input
                  type="file"
                  accept="image/*"
                  ref={bannerInputRef}
                  className="hidden"
                  onChange={handleBannerChange}
                />

                <div
                  onClick={() =>
                    !bannerPreview && bannerInputRef.current?.click()
                  }
                  className={`border-2 border-dashed rounded-lg transition-colors ${
                    bannerPreview
                      ? "p-2 bg-white"
                      : "p-6 sm:p-10 bg-slate-50 hover:bg-slate-100 cursor-pointer"
                  }`}
                >
                  {bannerPreview ? (
                    <div className="relative w-full sm:max-w-xl mx-auto aspect-video rounded-md overflow-hidden group">
                      <Image
                        src={bannerPreview}
                        alt="Banner preview"
                        fill
                        className="object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeBanner();
                        }}
                        className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-slate-500">
                      <div className="bg-white p-3 rounded-xl border shadow-sm">
                        <ImageIcon className="h-10 w-10" />
                      </div>
                      <p className="text-sm font-medium text-center">
                        Upload or click to select image
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-4 border-t">
                <Link href="/admin/dashboard/events">
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-full sm:w-auto px-6 h-11"
                  >
                    Cancel
                  </Button>
                </Link>

                <Button
                  type="submit"
                  className="w-full sm:w-auto px-6 h-11 font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? "Publishing..." : "Publish"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
