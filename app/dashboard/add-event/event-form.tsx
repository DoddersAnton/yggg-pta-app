"use client";

import { useForm } from "react-hook-form";
import { EventSchema, zEventSchema } from "@/types/event-schema";
import { useAction } from "next-safe-action/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
  FormDescription,
} from "@/components/ui/form";
import { PoundSterling, TicketPercent } from "lucide-react";
import Tiptap from "./tiptap";
import { createEvent } from "@/server/actions/create-event";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getEvent } from "@/server/actions/get-event";
import { UploadDropzone } from "@/app/api/uploadthing/upload";

const fieldLabel = "text-xs font-black uppercase tracking-wide text-black";
const fieldInput =
  "rounded-none border-2 border-black focus-visible:ring-0 focus-visible:border-purple-600 shadow-[2px_2px_0px_0px_#000]";

export default function EventForm() {
  const [imgUploading, setImgUploading] = useState(false);

  const form = useForm<zEventSchema>({
    resolver: zodResolver(EventSchema),
    defaultValues: { name: "", description: "", price: 0 },
    mode: "onChange",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const editMode = searchParams.get("id");

  const checkEvent = async (id: number) => {
    if (editMode) {
      const data = await getEvent(id);
      if (data.error) {
        toast.error(data.error);
        router.push("/dashboard/events");
        return;
      }
      if (data.success) {
        form.setValue("name", data.success.name);
        form.setValue("description", data.success.description ?? "");
        form.setValue("price", data.success.price);
        form.setValue("id", parseInt(editMode));
        form.setValue("capacity", data.success.capacity);
        form.setValue("startDate", new Date(data.success.startDate));
        form.setValue("endDate", new Date(data.success.endDate));
        form.setValue("location", data.success.location ?? "");
        form.setValue("image", data.success.imgUrl ?? "");
        form.setValue("imageWel", data.success.imgUrlWel ?? "");
      }
    }
  };

  useEffect(() => {
    if (editMode) checkEvent(parseInt(editMode));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { execute, status } = useAction(createEvent, {
    onSuccess: (data) => {
      if (data.data?.error) {
        toast.error(data.data.error);
        router.push("/dashboard/events");
        return;
      }
      if (data.data?.success) toast.success(data.data.success);
    },
    onExecute: () => {
      toast.loading(editMode ? "Editing Event…" : "Creating Event…");
    },
  });

  function onSubmit(values: zEventSchema) {
    execute(values);
  }

  return (
    <div className="border-2 border-black bg-white shadow-[6px_6px_0px_0px_#000]">
      {/* Form header */}
      <div className="bg-purple-700 border-b-2 border-black px-6 py-4">
        <h2 className="font-black text-white text-base uppercase tracking-wide">
          {editMode ? "Edit Event" : "Create Event"}
        </h2>
        <p className="text-purple-200 text-xs mt-0.5">
          {editMode ? "Update the details for this PTA event." : "Fill in the details to create a new PTA event."}
        </p>
      </div>

      {/* Validation errors */}
      {Object.keys(form.formState.errors).length > 0 && (
        <div className="border-b-2 border-black bg-red-50 px-6 py-3 space-y-1">
          {Object.entries(form.formState.errors).map(([key, error]) => (
            <p key={key} className="text-xs font-black text-red-600 uppercase tracking-wide">
              {key}: {error.message}
            </p>
          ))}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, (e) => console.log("Form errors:", e))}>
          <div className="p-6 space-y-6">

            {/* Event name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={fieldLabel}>Event Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Summer School Disco" className={fieldInput} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={fieldLabel}>Event Description</FormLabel>
                  <FormControl>
                    <Tiptap val={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price + Capacity */}
            <div className="grid grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={fieldLabel}>Price</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-0">
                        <span className="flex items-center justify-center h-10 w-10 border-2 border-r-0 border-black bg-purple-50 shrink-0">
                          <PoundSterling size={16} className="text-purple-700" />
                        </span>
                        <Input
                          type="number"
                          placeholder="0.00"
                          className="rounded-none border-2 border-black focus-visible:ring-0 focus-visible:border-purple-600 shadow-[2px_2px_0px_0px_#000]"
                          step="0.01"
                          min={0}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={fieldLabel}>Capacity</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-0">
                        <span className="flex items-center justify-center h-10 w-10 border-2 border-r-0 border-black bg-purple-50 shrink-0">
                          <TicketPercent size={16} className="text-purple-700" />
                        </span>
                        <Input
                          type="number"
                          placeholder="50"
                          className="rounded-none border-2 border-black focus-visible:ring-0 focus-visible:border-purple-600 shadow-[2px_2px_0px_0px_#000]"
                          step="1"
                          min={0}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription className="text-xs text-gray-500">Total available tickets</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Start + End dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={fieldLabel}>Event Start</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <input
                          type="date"
                          className="flex-1 h-10 px-3 border-2 border-black bg-white text-sm font-semibold shadow-[2px_2px_0px_0px_#000] focus:outline-none focus:border-purple-600"
                          value={field.value ? new Date(field.value).toLocaleDateString("en-CA") : ""}
                          onChange={(e) => {
                            const date = field.value ? new Date(field.value) : new Date();
                            const [y, m, d] = e.target.value.split("-").map(Number);
                            date.setFullYear(y, m - 1, d);
                            field.onChange(new Date(date));
                          }}
                        />
                        <input
                          type="time"
                          className="w-28 h-10 px-3 border-2 border-black bg-white text-sm font-semibold shadow-[2px_2px_0px_0px_#000] focus:outline-none focus:border-purple-600"
                          value={field.value ? `${String(new Date(field.value).getHours()).padStart(2,"0")}:${String(new Date(field.value).getMinutes()).padStart(2,"0")}` : ""}
                          onChange={(e) => {
                            const date = field.value ? new Date(field.value) : new Date();
                            const [h, m] = e.target.value.split(":").map(Number);
                            date.setHours(h, m);
                            field.onChange(new Date(date));
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={fieldLabel}>Event End</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <input
                          type="date"
                          className="flex-1 h-10 px-3 border-2 border-black bg-white text-sm font-semibold shadow-[2px_2px_0px_0px_#000] focus:outline-none focus:border-purple-600"
                          value={field.value ? new Date(field.value).toLocaleDateString("en-CA") : ""}
                          onChange={(e) => {
                            const date = field.value ? new Date(field.value) : new Date();
                            const [y, m, d] = e.target.value.split("-").map(Number);
                            date.setFullYear(y, m - 1, d);
                            field.onChange(new Date(date));
                          }}
                        />
                        <input
                          type="time"
                          className="w-28 h-10 px-3 border-2 border-black bg-white text-sm font-semibold shadow-[2px_2px_0px_0px_#000] focus:outline-none focus:border-purple-600"
                          value={field.value ? `${String(new Date(field.value).getHours()).padStart(2,"0")}:${String(new Date(field.value).getMinutes()).padStart(2,"0")}` : ""}
                          onChange={(e) => {
                            const date = field.value ? new Date(field.value) : new Date();
                            const [h, m] = e.target.value.split(":").map(Number);
                            date.setHours(h, m);
                            field.onChange(new Date(date));
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={fieldLabel}>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. School Hall, Llantrisant" className={fieldInput} {...field} />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500">Used to generate a maps link</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={fieldLabel}>Image (English)</FormLabel>
                    {form.getValues("image") && (
                      <div className="relative w-full h-28 border-2 border-black overflow-hidden">
                        <Image src={form.getValues("image")!} fill className="object-cover" alt="English event image" />
                      </div>
                    )}
                    <UploadDropzone
                      className="ut-button:rounded-none ut-button:bg-purple-700 ut-button:font-black ut-button:text-xs ut-button:uppercase ut-button:tracking-wide ut-button:border-2 ut-button:border-black ut-label:hidden ut-allowed-content:hidden border-2 border-dashed border-black"
                      endpoint="imgUploader"
                      onUploadBegin={() => setImgUploading(true)}
                      onUploadError={(error) => {
                        form.setError("image", { type: "validate", message: error.message });
                        setImgUploading(false);
                      }}
                      onClientUploadComplete={(res) => {
                        form.setValue("image", res[0].url!);
                        setImgUploading(false);
                      }}
                      content={{
                        button({ ready }) {
                          return <div>{ready ? "Upload image" : "Uploading…"}</div>;
                        },
                      }}
                    />
                    <FormControl>
                      <Input type="hidden" disabled={status === "executing"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imageWel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={fieldLabel}>Image (Welsh)</FormLabel>
                    {form.getValues("imageWel") && (
                      <div className="relative w-full h-28 border-2 border-black overflow-hidden">
                        <Image src={form.getValues("imageWel")!} fill className="object-cover" alt="Welsh event image" />
                      </div>
                    )}
                    <UploadDropzone
                      className="ut-button:rounded-none ut-button:bg-purple-700 ut-button:font-black ut-button:text-xs ut-button:uppercase ut-button:tracking-wide ut-button:border-2 ut-button:border-black ut-label:hidden ut-allowed-content:hidden border-2 border-dashed border-black"
                      endpoint="imgUploader"
                      onUploadBegin={() => setImgUploading(true)}
                      onUploadError={(error) => {
                        form.setError("imageWel", { type: "validate", message: error.message });
                        setImgUploading(false);
                      }}
                      onClientUploadComplete={(res) => {
                        form.setValue("imageWel", res[0].url!);
                        setImgUploading(false);
                      }}
                      content={{
                        button({ ready }) {
                          return <div>{ready ? "Upload image" : "Uploading…"}</div>;
                        },
                      }}
                    />
                    <FormControl>
                      <Input type="hidden" disabled={status === "executing"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex justify-between items-center border-t-2 border-black px-6 py-4 bg-purple-50">
            <button
              type="button"
              onClick={() => router.push("/dashboard/events")}
              className="inline-block bg-white text-black font-black text-xs uppercase tracking-wide px-5 py-2.5 border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={status === "executing" || imgUploading}
              className="inline-block bg-purple-700 text-white font-black text-xs uppercase tracking-wide px-6 py-2.5 border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-[3px_3px_0px_0px_#000]"
            >
              {status === "executing" || imgUploading
                ? "Saving…"
                : editMode
                ? "Save Changes"
                : "Create Event"}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
