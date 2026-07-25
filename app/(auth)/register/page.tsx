"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2, UserPlus } from "lucide-react";
import { authService } from "@/services/authService";
import { useNotificationStore } from "@/stores/notificationStore";
import Link from "next/link";

const schema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const { addNotification } = useNotificationStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      await authService.register({
        email: data.email,
        password: data.password,
        full_name: data.fullName,
        role: "PATIENT",
      });
      addNotification({
        type: "success",
        title: "Registration successful!",
        message: "You can now sign in to your Medical Vault.",
      });
      router.push("/login");
    } catch (err: unknown) {
      let msg = "Something went wrong. Please try again.";
      if (err && typeof err === "object" && "response" in err) {
        const responseData = (err as { response?: { data?: unknown } }).response?.data;
        if (responseData && typeof responseData === "object") {
          if ("message" in responseData && typeof responseData.message === "string") {
            msg = responseData.message;
          } else if ("detail" in responseData) {
            const detail = (responseData as { detail?: unknown }).detail;
            if (typeof detail === "string") {
              msg = detail;
            } else if (Array.isArray(detail) && detail.length > 0) {
              msg = detail.map((d: { msg?: string }) => d.msg || JSON.stringify(d)).join(", ");
            }
          }
        }
      }
      addNotification({ type: "error", title: "Registration failed", message: msg });
    }
  };

  return (
    <div className="glass-card rounded-2xl p-8 shadow-2xl border border-[#06635d]/20 bg-[#0b1f24]/80 backdrop-blur-md">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Create account</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Register for the CareFlow Patient Portal
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            Full name
          </label>
          <input
            id="fullName"
            type="text"
            {...register("fullName")}
            className="w-full rounded-xl border border-[#1e3a40] bg-[#021418] px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#14b8a6]/50 focus:border-[#14b8a6] transition-all"
            placeholder="John Doe"
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-rose-500">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
            className="w-full rounded-xl border border-[#1e3a40] bg-[#021418] px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#14b8a6]/50 focus:border-[#14b8a6] transition-all"
            placeholder="patient@careflow.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              {...register("password")}
              className="w-full rounded-xl border border-[#1e3a40] bg-[#021418] px-4 py-2.5 pr-11 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#14b8a6]/50 focus:border-[#14b8a6] transition-all"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-rose-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#06635d] to-[#14b8a6] hover:opacity-95 text-white font-semibold py-3 text-sm transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4" />
              Register
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-[#14b8a6] hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
