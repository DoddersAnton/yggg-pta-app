"use client";

import { useForm } from "react-hook-form";
import { EventSchema, zEventSchema } from "@/types/event-schema";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { useAction } from "next-safe-action/hooks";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getEvent } from "@/server/actions/get-event";
import { UploadButton, UploadDropzone } from "@/app/api/uploadthing/upload";

export default function EventForm() {
  const [imgUploading, setImgUploading] = useState(false);

  const form = useForm<zEventSchema>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
    },
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
        const id = parseInt(editMode);
        form.setValue("name", data.success.name);
        form.setValue("description", data.success.description ?? "");
        form.setValue("price", data.success.price);
        form.setValue("id", id);
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
    if (editMode) {
      checkEvent(parseInt(editMode));
    }
  }, []);

  const { execute, status } = useAction(createEvent, {
    onSuccess: (data) => {
      if (data.data?.error) {
        toast.error(data.data.error);
        router.push("/dashboard/products");
        return;
      }
      if (data.data?.success) {
        toast.success(data.data.success);
      }
    },
    onExecute: () => {
      if (editMode) {
        toast.loading(`Editing Event`);
      }
      if (!editMode) {
        toast.loading("Creating Event");
      }
    },
  });

  async function onSubmit(values: zEventSchema) {
    console.log("form", values);
    execute(values);
  }

  return (
    <Card className="w-[350px] mx-auto">
      <CardHeader>
        <CardTitle>{editMode ? "Edit" : "Create"} Event</CardTitle>
        <CardDescription>
          {editMode ? "Edit" : "Create"} the PTA event
        </CardDescription>
        <div className="text-red-500">
          {Object.entries(form.formState.errors).map(([key, error]) => (
            <div key={key} className="text-red-500">
              Field {key}
              {error.message}
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (errors) =>
              console.log("Form errors:", errors)
            )}
            className="space-y-4"
          >
            <div className="grid w-full items-center gap-4"></div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Name</FormLabel>
                  <FormControl>
                    <Input placeholder="add your event name" {...field} />
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
                  <FormLabel>Event Description</FormLabel>
                  <FormControl>
                    <Tiptap val={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Price</FormLabel>
                  <FormControl>
                    <div className="flex flex-row items-center gap-2 align-top">
                      <PoundSterling
                        size={34}
                        className="p-1 bg-muted rounded-md"
                      />
                      <Input
                        type="number"
                        placeholder="add your event price"
                        {...field}
                        step="0.1"
                        min={0}
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
                  <FormLabel>Event Capacity</FormLabel>
                  <FormControl>
                    <div className="flex flex-row items-center gap-2 align-top">
                      <TicketPercent
                        size={34}
                        className="p-1 bg-muted rounded-md"
                      />
                      <Input
                        type="number"
                        placeholder="add your event capacity"
                        {...field}
                        step="1"
                        min={0}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    This sets the total available tickets
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Start</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <DateTimePicker
                        value={field.value}
                        onChange={field.onChange}
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
                  <FormLabel>Event Location</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <DateTimePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Location</FormLabel>
                  <Input placeholder="add your event location" {...field} />
                  <FormDescription>
                    This enables a google maps link
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image (Eng)</FormLabel>
                  {form.getValues("image") && (
                    <Image
                      src={form.getValues("image")!}
                      width={42}
                      height={42}
                      className="rounded-full"
                      alt="Event Image"
                    />
                  )}

                  <UploadDropzone
                    className="scale-75 ut-button:ring-primary ut-label:bg-red-50 ut-button:bg-primary/75 hover:ut-button:bg-primary/100 ut:button:transition-all ut-button:duration-500 ut-label:hidden ut-allowed-content:hidden"
                    endpoint="imgUploader"
                    onUploadBegin={() => {
                      setImgUploading(true);
                    }}
                    onUploadError={(error) => {
                      form.setError("image", {
                        type: "validate",
                        message: error.message,
                      });
                      setImgUploading(false);
                      return;
                    }}
                    onClientUploadComplete={(res) => {
                      form.setValue("image", res[0].url!);
                      setImgUploading(false);
                      return;
                    }}
                    content={{
                      button({ ready }) {
                        if (ready) return <div>Change Event Img</div>;
                        return <div>Uploading...</div>;
                      },
                    }}
                  />
                  <FormControl>
                    <Input
                      placeholder="Event Image"
                      type="hidden"
                      disabled={status === "executing"}
                      {...field}
                    />
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
                  <FormLabel>Image (Welsh)</FormLabel>
                  {form.getValues("imageWel") && (
                    <Image
                      src={form.getValues("imageWel")!}
                      width={42}
                      height={42}
                      className="rounded-full"
                      alt="Event Image"
                    />
                  )}

                  <UploadDropzone
                    className="scale-75 ut-button:ring-primary ut-label:bg-red-50 ut-button:bg-primary/75 hover:ut-button:bg-primary/100 ut:button:transition-all ut-button:duration-500 ut-label:hidden ut-allowed-content:hidden"
                    endpoint="imgUploader"
                    onUploadBegin={() => {
                      setImgUploading(true);
                    }}
                    onUploadError={(error) => {
                      form.setError("imageWel", {
                        type: "validate",
                        message: error.message,
                      });
                      setImgUploading(false);
                      return;
                    }}
                    onClientUploadComplete={(res) => {
                      form.setValue("imageWel", res[0].url!);
                      setImgUploading(false);
                      return;
                    }}
                    content={{
                      button({ ready }) {
                        if (ready) return <div>Change Event Img</div>;
                        return <div>Uploading...</div>;
                      },
                    }}
                  />
                  <FormControl>
                    <Input
                      placeholder="Event Image"
                      type="hidden"
                      disabled={status === "executing"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button
                disabled={
                  status == "executing" 
                }
                type="submit"
              >
                Save
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
