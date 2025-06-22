"use client";

import React, { useState } from "react";
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
import { Loader2Icon } from "lucide-react"

type PostBountyProps = {};

export default function PostBounty(props: PostBountyProps) {

    const [bountytitle, setBountyTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitState, setSubmitState] = useState<"idle" | "submitting" | "submitted" | "error">("idle");


    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append("title", bountytitle);
        formData.append("description", description);
        formData.append("price", price);



        setSubmitState("submitting");
        try {
            await fetch("/api/post/submit-bounty", {
            method: "POST",
            body: formData,
            });
            setTimeout(() => setSubmitState("submitted"), 2000)

            // setSubmitState("submitted");
            // setTimeout(() => setSubmitState("idle"), 3300);
        } catch (error) {
            setSubmitState("error"); // or add error state if needed
        }
    };



    return (
        <Dialog 
            onOpenChange={open => {
                if (!open){

                    setSubmitState('idle')


                }
            }}>

            <DialogTrigger asChild>
                <Button>Post Bounty</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
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
                            onChange={e => { setBountyTitle(e.target.value); setSubmitState("idle"); }}

                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="bountyTitle2">
                            Tell the audience more about the listing in depth
                        </Label>
                        <Textarea placeholder="Bounty Description goes here"
                            value={description}
                            onChange={e => {setDescription(e.target.value); setSubmitState("idle")}} />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="bountyPrice">
                            What's the payout you want to set for? (INR)
                        </Label>
                        <Input
                            id="bountyPrice"
                            type="number"
                            step="0.01"
                            min={10}
                            max={100000}
                            placeholder="Enter amount in INR"
                            inputMode="decimal"
                            value={price}
                            onChange={e => {setPrice(e.target.value); setSubmitState("idle")}}
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

                </div>
                <DialogFooter className="sm:justify-start">
                    <Button
                        onClick={e => { setIsSubmitting(true); handleSubmit(e); }}
                        disabled={!bountytitle || !description || !price  || submitState === "submitted" }
                    >
                        {submitState === "idle" && <IconBrandTelegram />}
                        {submitState === "submitting" && <Loader2Icon className="animate-spin" />}
                        {submitState === "submitted" && <IconCheck/>}
                        {/* {isSubmitting && <Loader2Icon className="animate-spin" />} */}

                        {submitState === "submitted" ? "Bounty Posted" : "Post Bounty"}
                        
                    </Button>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Cancel
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
