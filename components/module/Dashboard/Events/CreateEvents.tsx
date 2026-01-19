/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import type React from "react";
import { useRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, X } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import NRDatePicker from "@/components/form/NRDatePicker";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useCreateEventMutation } from "@/src/redux/api/eventApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  date: z.date(),
  time: z.string().min(1, "Time is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  banner: z.any().optional(),
  capacity: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Capacity must be at least 1")
  ),
});

type EventFormValues = z.infer<typeof formSchema>;

export function EventForm() {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [createEvent, { isLoading }] = useCreateEventMutation();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      title: "",
      date: undefined,
      time: "",
      location: "",
      description: "",
      banner: undefined,
      capacity: 1,
    },
  });

  // Image change handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      form.setValue("banner", file);
    };
    reader.readAsDataURL(file);
  };

  // Remove image handler
  const removeImage = () => {
    setPreview(null);
    form.setValue("banner", undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Submit form handler
  const onSubmit = async (values: EventFormValues) => {
    try {
      const formData = new FormData();

      const { banner, capacity, ...rest } = values;

      // Ensure capacity is passed as a number to the backend
      const payload = {
        ...rest,
        capacity: Number(capacity),
        date: values.date.toISOString(),
      };

      formData.append("data", JSON.stringify(payload));

      if (banner instanceof File) {
        formData.append("image", banner);
      }

      const res = (await createEvent(formData).unwrap()) as any;

      if (res?.success) {
        toast.success(res.message || "Event created successfully");
        router.push("/admin/dashboard/events");
        form.reset();
        setPreview(null);
      }
    } catch (error) {
      console.error("Event submit failed:", error);
      toast.error("Failed to create event");
    }
  };

  return (
    <div className="mx-auto container px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
          Create New Event
        </h1>
        <p className="text-sm text-muted-foreground">
          Fill in the details to create a new event
        </p>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="border-b py-4">
          <CardTitle className="text-base sm:text-lg font-medium">
            Event Details
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-4 sm:pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <PHInput
                control={form.control}
                name="title"
                label="Title"
                type="text"
                placeholder="Enter event title..."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <NRDatePicker
                  control={form.control}
                  name="date"
                  label="Event Date"
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input type="time" className="h-11" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <PHInput
                control={form.control}
                name="location"
                label="Location"
                type="text"
                placeholder="Enter location..."
              />
              <PHInput
                control={form.control}
                name="capacity"
                label="Capacity"
                type="number"
                placeholder="Enter capacity..."
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your event..."
                        className="min-h-30 sm:min-h-37.5 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel>Event Banner</FormLabel>

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageChange}
                />

                <div
                  onClick={() => !preview && fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-lg transition-colors ${
                    preview
                      ? "p-2 bg-white"
                      : "p-6 sm:p-10 bg-slate-50 hover:bg-slate-100 cursor-pointer"
                  }`}
                >
                  {preview ? (
                    <div className="relative w-full sm:max-w-xl mx-auto aspect-video rounded-md overflow-hidden group">
                      <Image
                        src={preview}
                        alt="Banner preview"
                        fill
                        className="object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage();
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
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full sm:w-auto px-6 h-11"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="w-full sm:w-auto px-6 h-11 font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? "Publishing..." : "Publish Event"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}