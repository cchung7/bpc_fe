/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
  useGetAllSpeakerQuery,
  useGetSingleEventQuery,
  useUpdateEventMutation,
} from "@/src/redux/api/eventApi";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  date: z.date(),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  banner: z.any().optional(),
  // speakerId: z.string().min(1, "Speaker is required"),
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

  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation();
  const { data: getAllSpeakerData } = useGetAllSpeakerQuery({}) as any;

  const allSpeaker = getAllSpeakerData?.data ?? [];

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const form = useForm<EventFormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      title: "",
      date: undefined,
      startTime: "",
      endTime: "",
      location: "",
      description: "",
      banner: undefined,
      // speakerId: "",
      capacity: 1,
    },
  });

  useEffect(() => {
    if (!event) return;

    form.reset({
      title: event.title,
      date: new Date(event.date),
      startTime: event.startTime || "",
      endTime: event.endTime || "",
      location: event.location,
      description: event.description,
      banner: undefined,
      // speakerId: event.speakerId || "",
      capacity: event.capacity || 1,
    });

    setBannerPreview(event.image || null);
  }, [event, form]);

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setBannerPreview(reader.result as string);
      form.setValue("banner", file);
    };
    reader.readAsDataURL(file);
  };

  const removeBanner = () => {
    setBannerPreview(null);
    form.setValue("banner", undefined);
    if (bannerInputRef.current) bannerInputRef.current.value = "";
  };

  const onSubmit = async (values: EventFormValues) => {
    try {
      const formData = new FormData();

      const { banner, capacity, date, ...rest } = values;

      const selectedDate = new Date(date);
      selectedDate.setMinutes(
        selectedDate.getMinutes() - selectedDate.getTimezoneOffset()
      );
      const formattedDate = selectedDate.toISOString();

      const payload = {
        ...rest,
        capacity: Number(capacity),
        date: formattedDate,
      };

      formData.append("data", JSON.stringify(payload));

      if (banner instanceof File) {
        formData.append("image", banner);
      }

      const res = (await updateEvent({ id, data: formData }).unwrap()) as any;

      if (res?.success) {
        toast.success(res.message || "Event updated successfully");
        router.push("/admin/dashboard/events");
        form.reset();
        setBannerPreview(null);
      }
    } catch (error) {
      console.error("Event update failed:", error);
      toast.error("Failed to update event");
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto container px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-center">Loading event...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto container px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-center text-red-500">Failed to load event data.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto container px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
          Update Event
        </h1>
        <p className="text-sm text-muted-foreground">
          Modify the event details below
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
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input type="time" className="h-11" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input type="time" className="h-11" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <NRDatePicker
                  control={form.control}
                  name="date"
                  label="Event Date"
                />
                {/* <PHSelect
                  control={form.control}
                  name="speakerId"
                  label="Speaker"
                  options={allSpeaker.map((speaker: any) => ({
                    label: speaker.name,
                    value: speaker.id,
                  }))}
                /> */}
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
                        Upload or click to select banner image
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
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : "Update Event"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
