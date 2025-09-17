"use client";
import React from "react";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useAuth } from "@/context/AuthContext";
import ProfileForm from "@/components/user/ProfileForm";
import ChangePasswordForm from "@/components/user/ChangePasswordForm";
import ProfilePageLayout from "@/components/user/ProfilePageLayout";

export default function UnifiedProfilePage() {
  const { user } = useAuth();
  // No forzamos rol específico, sólo requerimos autenticación
  const { allowed } = useRequireAuth();
  const role = user?.role || "user";

  if (!allowed) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const subtitles = {
    admin: "Gestiona datos y seguridad de tu cuenta administrativa.",
    dentist: "Actualiza tus datos y la configuración de tu cuenta.",
    user: "Gestiona tu información personal y la seguridad de tu cuenta.",
  };

  return (
    //hola esto
    <ProfilePageLayout
      role={role}
      title="Mi Perfil"
      subtitle={subtitles[role] || subtitles.user}
    >
      {[<ProfileForm key="profile" />, <ChangePasswordForm key="pwd" />]}
    </ProfilePageLayout>
  );
}
