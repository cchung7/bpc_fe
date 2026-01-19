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

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  date: z.date({}),
  time: z.string().min(1, "Time is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  banner: z.any().optional(),
});

type EventFormValues = z.infer<typeof formSchema>;

export function EventForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<EventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      date: undefined,
      time: "",
      location: "",
      description: "",
      banner: undefined,
    },
  });

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

  const removeImage = () => {
    setPreview(null);
    form.setValue("banner", undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  function onSubmit(values: EventFormValues) {
    const payload = {
      ...values,
      date: values.date.toISOString(),
    };

    console.log("Event Form Submitted:", payload);
  }

  return (
    <div className="max-w-8xl mx-auto p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create New Event
        </h1>
        <p className="text-sm text-muted-foreground">
          Fill in the details to create a new event
        </p>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="border-b py-4">
          <CardTitle className="text-lg font-medium">Event Details</CardTitle>
        </CardHeader>

        <CardContent className="pt-6">
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
                placeholder="Enter event location..."
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
                        className="min-h-30 resize-none"
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
                      : "p-10 bg-slate-50 hover:bg-slate-100 cursor-pointer"
                  }`}
                >
                  {preview ? (
                    <div className="relative w-5xl mx-auto aspect-video rounded-md overflow-hidden group">
                      <Image
                        src={preview}
                        alt="Banner preview"
                        width={400}
                        height={400}
                        className="object-cover w-full h-full mx-auto"
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
                      <p className="text-sm font-medium">
                        Upload or click to select image
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t">
                <Button type="button" variant="secondary" className="px-6 h-11">
                  Cancel
                </Button>
                <Button type="submit" className="px-6 h-11 font-semibold">
                  Publish Event
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}