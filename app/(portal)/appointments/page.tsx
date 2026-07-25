"use client";

import React from "react";
import { Calendar, MapPin, Clock, Star, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AppointmentsPage() {
  const [bookedSuccess, setBookedSuccess] = React.useState(false);

  const availableDoctors = [
    {
      name: "Dr. Tarek El-Mansoury",
      specialty: "Cardiology",
      hospital: "Cairo Medical Center",
      rating: "4.9",
      experience: "15 yrs exp",
      nextAvailable: "Tomorrow, 10:30 AM",
      avatarUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150",
    },
    {
      name: "Dr. Mona Abdel-Aziz",
      specialty: "Internal Medicine",
      hospital: "CareFlow Digital Clinic",
      rating: "4.8",
      experience: "12 yrs exp",
      nextAvailable: "Thu, Aug 4, 02:00 PM",
      avatarUrl: "https://images.unsplash.com/photo-1594824813566-88855ce78c40?w=150",
    },
    {
      name: "Dr. Youssef Nabil",
      specialty: "Neurology",
      hospital: "Nile Specialist Hospital",
      rating: "5.0",
      experience: "18 yrs exp",
      nextAvailable: "Friday, Aug 5, 11:00 AM",
      avatarUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150",
    },
  ];

  const handleQuickBook = () => {
    setBookedSuccess(true);
    setTimeout(() => setBookedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
            <Calendar className="size-7 text-[#06635d] dark:text-[#14b8a6]" />
            Doctor Consultations & Appointments
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Search top specialists, view available slots, and book instant visits
          </p>
        </div>

        {bookedSuccess && (
          <Badge variant="success" className="gap-1.5 text-xs animate-bounce">
            <CheckCircle2 className="size-4" />
            <span>Appointment Request Submitted!</span>
          </Badge>
        )}
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {availableDoctors.map((doc, idx) => (
          <Card key={idx} className="glass-card hover:shadow-xl transition-all flex flex-col justify-between">
            <CardHeader className="pb-3 border-b border-[#e2e8f0] dark:border-[#1e3a40]">
              <div className="flex items-center gap-3">
                <img
                  src={doc.avatarUrl}
                  alt={doc.name}
                  className="size-14 rounded-full object-cover border-2 border-[#06635d]/30"
                />
                <div>
                  <CardTitle className="text-base">{doc.name}</CardTitle>
                  <p className="text-xs text-[#06635d] dark:text-[#14b8a6] font-semibold">{doc.specialty}</p>
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-1">
                    <span className="flex items-center gap-1 font-bold text-amber-500">
                      <Star className="size-3 fill-amber-500" />
                      {doc.rating}
                    </span>
                    <span>• {doc.experience}</span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-4 text-xs">
              <div className="space-y-1.5 text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-[#06635d] dark:text-[#14b8a6]" />
                  <span>{doc.hospital}</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium text-foreground">
                  <Clock className="size-3.5 text-[#06635d] dark:text-[#14b8a6]" />
                  <span>Next Available: {doc.nextAvailable}</span>
                </div>
              </div>

              <Button
                onClick={handleQuickBook}
                className="w-full bg-gradient-to-r from-[#06635d] to-[#14b8a6] text-white font-bold text-xs"
              >
                Instant Book Visit
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
