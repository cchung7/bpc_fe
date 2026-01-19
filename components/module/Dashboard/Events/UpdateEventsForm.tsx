/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
import {
  useGetSingleEventQuery,
  useUpdateEventMutation,
} from "@/src/redux/api/eventApi";
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

export default function UpdateEventForm() {
  const { id } = useParams();
  const router = useRouter();

  const { data: response, isLoading, error } = useGetSingleEventQuery(id);
  const event = response?.data;

  const [updateEvent] = useUpdateEventMutation();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

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

  useEffect(() => {
    if (!event) return;

    form.reset({
      title: event.title,
      date: new Date(event.date),
      time: event.time,
      location: event.location,
      description: event.description,
      banner: undefined,
      capacity: event.capacity || 1,
    });

    setPreview(event.image || null);
  }, [event, form]);

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
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (values: EventFormValues) => {
    try {
      const formData = new FormData();

      const payload = {
        title: values.title,
        date: values.date.toISOString(),
        time: values.time,
        location: values.location,
        description: values.description,
        capacity: values.capacity,
      };

      formData.append("data", JSON.stringify(payload));

      if (values.banner) {
        formData.append("image", values.banner);
      }

      await updateEvent({ id, data: formData }).unwrap();
      toast.success("Event updated successfully");
      router.push("/admin/dashboard/events");
    } catch (error) {
      console.error(error);
      alert("Failed to update event");
    }
  };

  if (isLoading) return <p className="p-6">Loading event...</p>;

  if (error)
    return <p className="p-6 text-red-500">Failed to load event data.</p>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Update Event</h1>

      <Card>
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <PHInput
                control={form.control}
                name="title"
                label="Title"
                placeholder="Event title"
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
                        <Input type="time" {...field} />
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
                placeholder="Event location"
              />

              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capacity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Event capacity"
                        min={1}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="min-h-30" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel>Event Banner</FormLabel>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />

                <div
                  onClick={() => !preview && fileInputRef.current?.click()}
                  className="border-2 border-dashed rounded-lg p-6 cursor-pointer"
                >
                  {preview ? (
                    <div className="relative aspect-video">
                      <Image
                        src={preview}
                        alt="Preview"
                        fill
                        className="object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage();
                        }}
                        className="absolute top-2 right-2 bg-black/70 p-1 rounded-full text-white"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-muted-foreground">
                      <ImageIcon size={40} />
                      <p>Click to upload image</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => router.push("/admin/dashboard/events")}
                >
                  Cancel
                </Button>
                <Button type="submit">Update Event</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}