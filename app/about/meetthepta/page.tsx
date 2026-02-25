"use client";

import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Member = {
  name: string;
  title: string;
  photo: string;
  bio: string;
};

const members: Member[] = [
  {
    name: "Alex Morgan",
    title: "PTA Chair",
    photo: "/people.png",
    bio: "Alex coordinates the PTA committee and leads planning for annual priorities, events, and volunteer teams.",
  },
  {
    name: "Sian Roberts",
    title: "Vice Chair",
    photo: "/people.png",
    bio: "Sian supports cross-year activities and helps ensure events are inclusive, welcoming, and family friendly.",
  },
  {
    name: "Tom Evans",
    title: "Treasurer",
    photo: "/people.png",
    bio: "Tom manages budgeting, tracks fundraising outcomes, and reports clearly on how funds benefit pupils.",
  },
  {
    name: "Megan Hughes",
    title: "Secretary",
    photo: "/people.png",
    bio: "Megan keeps meetings organised, records action points, and helps communicate updates with the school community.",
  },
  {
    name: "Rhys Williams",
    title: "Events Coordinator",
    photo: "/people.png",
    bio: "Rhys leads event logistics and works with volunteers to run successful community activities throughout the year.",
  },
  {
    name: "Nia Thomas",
    title: "Volunteer Lead",
    photo: "/people.png",
    bio: "Nia helps recruit and support parent volunteers, matching skills and availability with PTA needs.",
  },
];

export default function MeetThePtaPage() {
  return (
    <main className="pt-24 pb-12 px-6">
      <section className="max-w-6xl mx-auto mb-8">
        <h1 className="text-4xl font-extrabold mb-3">Meet the PTA</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Click on a member card to learn more about who they are and the role they play in supporting our school community.
        </p>
      </section>

      <section className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {members.map((member) => (
          <Dialog key={member.name}>
            <DialogTrigger asChild>
              <button className="text-left rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Card className="h-full transition hover:-translate-y-1 hover:shadow-md">
                  <div className="relative w-full h-56">
                    <Image
                      src={member.photo}
                      alt={`${member.name} profile placeholder`}
                      fill
                      className="object-cover rounded-t-xl"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{member.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{member.title}</p>
                  </CardContent>
                </Card>
              </button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>{member.name}</DialogTitle>
                <DialogDescription>{member.title}</DialogDescription>
              </DialogHeader>
              <div className="relative w-full h-56 rounded-md overflow-hidden border">
                <Image
                  src={member.photo}
                  alt={`${member.name} profile placeholder`}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm text-gray-700">{member.bio}</p>
            </DialogContent>
          </Dialog>
        ))}
      </section>
    </main>
  );
}
