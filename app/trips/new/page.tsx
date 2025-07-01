"use client";

import {Card, CardHeader, CardContent} from "@/components/ui/card";
import { createTrip } from "@/lib/actions/create-trip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useTransition } from "react";
import { UploadButton } from "@/lib/upload-thing";
import Image from "next/image";
import { error } from "console";

export default function NewTrip() {
    const [isPending, startTransition] = useTransition();
    const [imageUrl, setImageUrl] = useState<string | null> (null);
    return (
        <div className="max-w-lg mx-auto mt-10 ">
            <Card>
                <CardHeader>New Trip</CardHeader>
                <CardContent>
                    <form 
                        className="space-y-6" 
                        action={(formData: FormData) => {
                            if(imageUrl){
                                formData.append("imageUrl", imageUrl);
                            }
                            startTransition(() => {
                                createTrip(formData);
                            });
                        }}
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {" "}
                                Title
                            </label>
                            <input type="text" name="title" className={cn(
                                "w-full border border-gray-300 px-3 py-2",
                                "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                )} 
                                placeholder="Trip Title"
                                required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea name="description" className={cn(
                                "w-full border border-gray-300 px-3 py-2",
                                "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                )} 
                                placeholder="Trip Description" 
                                required />
                        </div> 
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {" "}
                                    Start Date
                                </label>
                                <input type="date" name="start date" className={cn(
                                    "w-full border border-gray-300 px-3 py-2",
                                    "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    )} placeholder="Trip Title" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {" "}
                                    End Date
                                </label>
                                <input type="date" name="end date" className={cn(
                                    "w-full border border-gray-300 px-3 py-2",
                                    "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    )} placeholder="Trip Title" />
                            </div>
                        </div>

                        <div>
                            <label>Trip Image</label>
                            {imageUrl &&(
                                <Image
                                    src= {imageUrl}
                                    alt="Trip Image"
                                    className="w-full mb-4 rounded-md max-h-48 object-cover"
                                    width={300}
                                    height={100}
                                />
                            )}
                            <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete = {(res) => {
                                    if (res && res[0].ufsUrl) {
                                        setImageUrl(res[0].ufsUrl);
                                    }
                                }}
                                onUploadError={(error: Error) => {
                                    console.error("Upload error: ", error);
                                }}
                            />
                        </div>

                        <Button type="submit" disabled={isPending} className="w-full">
                            {isPending ?"Creating.." : "Create Trip"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}