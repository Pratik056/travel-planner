"use client";

import { Trip } from "@/app/generated/prisma";
import Image from "next/image";

interface TripDetailClientProps {
    trip:Trip;
}


export default function TripDetailClient({trip}: TripDetailClientProps){
    return <div className="container mx-auto px-4 py-8 space-y-8">
        {trip.imageUrl && (
            <div className="w-full h-72 md:h-96 overflow-hidden rounded-xl shadow-lg relative">
                <Image
                    src={trip.imageUrl}
                    alt={trip.title}
                    className="object-cover"
                    fill
                    priority
                />
            </div>
        )}

        <div className="bg-white p-6 shadow rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
                <h1 className="text-4xl font-extrabold text-gray-900">{trip.title}</h1>

                <div className="flex items-center text-gray-500 mt-2">
                    <span className="text-lg">
                        {trip.startDate.toLocaleDateString()} - {""}
                        {trip.endDate.toLocaleDateString()}
                    </span>
                </div>
            </div>
        </div>
        </div>
}