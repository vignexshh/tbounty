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
import { Loader2Icon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import PostBounty from "@/components/functions/PostBounty";


export default function ProfileHotDispay() {

    return (
        <div className="flex flex-col md:flex-row ">
            <Card className="m-4  flex flex-col items-start w-full md:w-1/2">
                <CardHeader className="flex flex-row items-center">
                    <div>
                        <Avatar className="w-20 h-20">
                            <AvatarImage src="https://avatars.githubusercontent.com/u/121820772?v=4" />
                            <AvatarFallback className="text-2xl">TD</AvatarFallback>
                        </Avatar>
                    </div>
                </CardHeader>
                <div className="pl-7 pr-7"> 
                <div className="mt-2 mb-2">Vignesh T D</div>
                <CardFooter className="pl-0">
                    <PostBounty />
                </CardFooter>
                </div>
            </Card>
            <Card className="m-4  flex flex-col items-start w-full md:w-1/2">
                <CardHeader>
                    <CardTitle>
                        Available bounty stacks
                    </CardTitle>
                    
                </CardHeader>
            </Card>
            
        </div>
        

    )
}