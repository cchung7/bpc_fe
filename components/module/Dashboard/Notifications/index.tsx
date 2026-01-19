/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  useGetAllEventByNotificationQuery,
  useSendNotificationMutation,
} from "@/src/redux/api/notificationApi";
import { Calendar, CheckCircle, Send, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type RecipientType = "ALL" | "APPROVED" | "EVENT";

const RECIPIENT_DATA = {
  ALL: { label: "ALL", count: 150, icon: Users },
  APPROVED: { label: "APPROVED", count: 45, icon: CheckCircle },
  EVENT: { label: "EVENT", count: 22, icon: Calendar },
};

export default function SendNotificationPage() {
  const [sendNotification, { isLoading }] = useSendNotificationMutation();
  const { data: getAllEventByNotification } = useGetAllEventByNotificationQuery(
    {}
  ) as any;

  const allEvents = getAllEventByNotification?.data ?? [];

  const [recipient, setRecipient] = useState<RecipientType>("ALL");
  const [message, setMessage] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const handleSend = async () => {
    if (!message.trim()) {
      return;
    }

    // Log the data being sent
    console.log("Sending Notification Data:", {
      recipientType: RECIPIENT_DATA[recipient].label,
      message: message,
      eventId: selectedEvent, // Only included if recipient is "EVENT"
    });

    try {
      let res;
      // Depending on the recipient type, send the notification
      if (recipient === "ALL") {
        res = await sendNotification({
          type: "ALL",
          message: message,
        }).unwrap(); // Wait for the response from the API call
      } else if (recipient === "APPROVED") {
        res = await sendNotification({
          type: "APPROVED",
          message: message,
        }).unwrap(); // Wait for the response from the API call
      } else if (recipient === "EVENT" && selectedEvent) {
        res = (await sendNotification({
          type: "EVENT",
          message: message,
          eventId: selectedEvent,
        }).unwrap()) as any; // Wait for the response from the API call
      }

      // Log the successful response
      console.log("Notification sent successfully:", res);
      toast.success(res.message || "Notification sent successfully");
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 lg:p-12">
      <div className="mx-auto container">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-900">
            Send Notification
          </h1>
          <p className="text-slate-500">
            Communicate with your members via group messaging
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="border-b">
              <CardTitle className="text-xl font-medium">
                Compose Message
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-8 pt-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700">
                  Recipients<span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {Object.entries(RECIPIENT_DATA).map(([key, data]) => {
                    const Icon = data.icon;
                    const isActive = recipient === key;
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          setRecipient(key as RecipientType);
                          setSelectedEvent(null); // Reset selected event when changing recipient
                        }}
                        className={cn(
                          "flex flex-col items-center justify-center rounded-lg border-2 p-6 transition-all",
                          isActive
                            ? "border-[#D4FF4D] bg-[#D4FF4D]/5 ring-1 ring-[#D4FF4D]"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        )}
                      >
                        <Icon
                          className={cn(
                            "mb-3 h-6 w-6",
                            isActive ? "text-slate-900" : "text-slate-500"
                          )}
                        />
                        <span
                          className={cn(
                            "text-sm font-medium",
                            isActive ? "text-slate-900" : "text-slate-600"
                          )}
                        >
                          {data.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {recipient === "EVENT" && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700">
                    Select Event<span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {" "}
                    {/* Added max-height and overflow */}
                    {allEvents.map((event: any) => (
                      <button
                        key={event.id}
                        onClick={() => setSelectedEvent(event.id)}
                        className={cn(
                          "w-full p-4 text-left border rounded-lg",
                          selectedEvent === event.id
                            ? "border-[#D4FF4D] bg-[#D4FF4D]/5"
                            : "border-slate-200 hover:border-slate-300"
                        )}
                      >
                        <div className="font-medium text-slate-900">
                          {event.title}
                        </div>
                        <div className="text-sm text-slate-600">
                          {event.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700">
                  Message<span className="text-red-500">*</span>
                </label>
                <Textarea
                  placeholder="Type your message here..."
                  className="min-h-50 resize-none border-slate-200 focus:border-[#D4FF4D] focus:ring-[#D4FF4D]"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t pt-6">
                <Button
                  variant="outline"
                  className="px-6 text-slate-600 bg-transparent"
                  onClick={() => setMessage("")}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSend}
                  className="bg-[#D4FF4D] px-6 text-slate-900 hover:bg-[#c2eb46]"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Notification
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sidebar Summary & Tips */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="border-b">
                <CardTitle className="text-lg font-medium">
                  Recipient Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Sending to
                  </p>
                  <p className="text-lg font-medium text-slate-900">
                    {RECIPIENT_DATA[recipient].label}
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  {/* <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Total Recipients
                  </p>
                  <p className="text-3xl font-bold text-slate-900">
                    {RECIPIENT_DATA[recipient].count}
                  </p> */}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="border-b">
                <CardTitle className="text-lg font-medium">
                  Best Practices
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-4 text-sm text-slate-600">
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                    Keep messages clear and concise
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                    Include relevant dates and details
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                    Avoid sending too frequently
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                    Proofread before sending
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}