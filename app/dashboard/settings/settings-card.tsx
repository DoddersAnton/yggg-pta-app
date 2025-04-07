import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserProfile } from "@clerk/nextjs";

export default function SettingsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Settings</CardTitle>
        <CardDescription>Update your account settings</CardDescription>
      </CardHeader>
      <CardContent>
        <UserProfile></UserProfile>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
