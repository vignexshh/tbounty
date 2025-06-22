"use Client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PostBounty from "@/components/functions/PostBounty";

import { IconBrandTelegram } from "@tabler/icons-react";

import ProfileHotDispay from "@/components/dashboard/ProfileHotDispay";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#F4F2EE", minHeight: "100vh", width: "100vw" }}>
      <ProfileHotDispay />
    </div>

  );
}
