"use client";

import React, { useState, useEffect } from "react";
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

import { IconBrandTelegram, IconCheck } from "@tabler/icons-react";
import { IconLoaderQuarter } from "@tabler/icons-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

type PostBountyProps = {};

export default function PostBounty(props: PostBountyProps) {

    const [bountytitle, setBountyTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitState, setSubmitState] = useState<"idle" | "submitting" | "submitted" | "error">("idle");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (submitState === "submitted") {
            setTimeout(() => setOpen(false), 1200); // closes after 1.2s
        }
    }, [submitState]);


    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append("title", bountytitle);
        formData.append("description", description);
        formData.append("price", price);



        setSubmitState("submitting");
        try {
            const response = await fetch("/api/post/submit-bounty", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                setTimeout(() => setSubmitState("error"), 2000)
                // setSubmitState("error");
                return;
            }


            setTimeout(() => setSubmitState("submitted"), 2000)

            // setSubmitState("submitted");
            // setTimeout(() => setSubmitState("idle"), 3300);
        } catch (error) {
            console.error("Failed to submit bounty:", error);
            setSubmitState("error"); // or add error state if needed
        }
    };



    return (
        <Dialog
            open={open}
            onOpenChange={o => {
                setOpen(o);
                if (!o) {
                    setTimeout(() => setSubmitState("idle"), 1000);
                }
            }}
        >

            <DialogTrigger asChild>
                <Button onClick={() => setOpen(true)}>Post Bounty</Button>
            </DialogTrigger>
            <DialogContent className={`sm:max-w-md ${submitState === "error" ? "shake" : ""}`}>
                <DialogHeader>
                    <DialogTitle>List a New Bounty</DialogTitle>
                    <DialogDescription>
                        Anyone on the platform can participate in this bounty
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="bountyTitle">
                            What should we name your bounty title?
                        </Label>
                        <Input
                            id="bountyTitle"
                            placeholder="eg. Design a shopping bag artwork"
                            value={bountytitle}
                            minLength={20}
                            onChange={e => { setBountyTitle(e.target.value); setSubmitState("idle"); }}

                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="bountyTitle2">
                            Tell the audience more about the listing in depth
                        </Label>
                        <Textarea placeholder="Bounty Description goes here"
                            value={description}
                            minLength={40}
                            onChange={e => { setDescription(e.target.value); setSubmitState("idle") }} />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="bountyPrice">
                            What's the payout you want to set for? (INR)
                        </Label>
                        <Input
                            id="bountyPrice"
                            type="number"
                            step="80.00"
                            min={400}
                            max={100000}
                            placeholder="Enter amount in INR"
                            inputMode="decimal"
                            value={price}
                            onChange={e => { setPrice(e.target.value); setSubmitState("idle") }}
                        />
                    </div>

                    {/* <div className="grid gap-3">
              <Label htmlFor="bountyPrice">
              You can upload files that could be part of the bounty*
            </Label>
            <Input
              id="bountyFiles"
              type="file"
              multiple
              accept="*"
              />

            </div> */}
                    {submitState === "error" && (<Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Failed to post</AlertTitle>
                        <AlertDescription>
                            Something went wrong, please try again later
                        </AlertDescription>


                    </Alert>)}

                </div>
                <DialogFooter className="sm:justify-start flex flex-row gap-2">

                    <Button
                        onClick={e => { setIsSubmitting(true); handleSubmit(e); }}
                        disabled={!bountytitle || !description || !price || submitState === "submitted"}
                    >
                        {(submitState === "idle" || submitState === "error") && <IconBrandTelegram />}
                        {submitState === "submitting" && <IconLoaderQuarter className="animate-spin" />}
                        {submitState === "submitted" && <IconCheck />}

                        {/* {isSubmitting && <IconLoaderQuarter className="animate-spin" />} */}

                        {submitState === "submitted" ? "Bounty Posted" : "Post Bounty"}

                    </Button>



                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            {submitState === "submitted" ? "Done" : "Cancel"}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
