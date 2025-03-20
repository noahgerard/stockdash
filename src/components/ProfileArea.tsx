import { signOut, useSession } from "~/utils/auth-client";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";
import { HomeIcon, LogOut } from "lucide-react";
import Link from "next/link";

export default function ProfileArea() {
  const session = useSession();

  return (
    <>
      {session.isPending ? (
        <Skeleton className="h-10 w-10 rounded-full" />
      ) : session.error ? (
        "Error"
      ) : session.data ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="box-border border-2 border-red-400">
              <AvatarImage
                className="object-cover"
                src={
                  session.data?.user.image ??
                  "https://img.freepik.com/premium-photo/cool-cat-wearing-pink-sunglasses-with-neon-light-background_514761-16858.jpg"
                }
                alt="Profile"
              />
              <AvatarFallback>{session.data?.user.name}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>{session.data?.user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/dashboard">
              <DropdownMenuItem>
                <HomeIcon />
                <span>Dashboard</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/" onClick={() => signOut()}>
              <DropdownMenuItem>
                <LogOut />
                <span>Sign out</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex gap-4">
          <Button variant={"outline"}>
            <a href="/login">Login</a>
          </Button>
          <Button variant={"default"}>
            <a href="/signup">Sign up</a>
          </Button>
        </div>
      )}
    </>
  );
}
