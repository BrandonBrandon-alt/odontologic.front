"use client";
import React, { useState, useRef } from "react";
import Card from "@/components/ui/Card";
import Form from "@/components/ui/Form";
import Input, { PasswordInput } from "@/components/ui/Input";
import DentalButton from "@/components/ui/Button";
import Alert from "@/components/ui/Alert"; // ya no mostrado inline
import { useToast } from "@/components/ui/ToastProvider";
import { userService } from "@/services/user.service";

const validateNewPassword = (pwd) => {
  if (!pwd) return "La nueva contraseña es requerida";
  if (pwd.length < 8) return "Debe tener al menos 8 caracteres";
  if (!/[a-z]/.test(pwd)) return "Debe incluir una minúscula";
  if (!/[A-Z]/.test(pwd)) return "Debe incluir una mayúscula";
  if (!/[0-9]/.test(pwd)) return "Debe incluir un número";
  if (!/[!@#$%^&*(),.?":{}|<>_+-]/.test(pwd)) return "Debe incluir un símbolo";
  return "";
};

export default function ChangePasswordForm({ compact = false }) {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState(null);
  const [success, setSuccess] = useState(false);
  const { show: showToast } = useToast();
  const firstErrorRef = useRef(null);

  const handleChange = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);
    setSuccess(false);

    const newErrs = {};
    if (!form.currentPassword)
      newErrs.currentPassword = "La contraseña actual es requerida";
    const pwdMsg = validateNewPassword(form.newPassword);
    if (pwdMsg) newErrs.newPassword = pwdMsg;
    if (!form.confirmNewPassword)
      newErrs.confirmNewPassword = "Confirma la nueva contraseña";
    else if (form.confirmNewPassword !== form.newPassword)
      newErrs.confirmNewPassword = "Las contraseñas no coinciden";

    if (Object.keys(newErrs).length) {
      setErrors(newErrs);
      const firstKey = Object.keys(newErrs)[0];
      const el = document.getElementById(firstKey);
      if (el) el.focus();
      return;
    }

    try {
      setSaving(true);
      const { message } = await userService.changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      const msg = message || "Contraseña actualizada";
      setAlert(msg);
      setSuccess(true);
      setForm({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
      showToast({ type: "success", message: msg, autoCloseMs: 4000 });
    } catch (e) {
      const errMsg =
        e.response?.data?.message || e.message || "Error al cambiar contraseña";
      setAlert(errMsg);
      showToast({ type: "error", message: errMsg, autoCloseMs: 6000 });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className={`${compact ? "p-4" : "p-6"} relative`} shadow="md">
      <Form onSubmit={handleSubmit} isLoading={saving} isSuccess={success}>
        <Form.Header title="Contraseña" description="Actualiza tu contraseña" />
        {/* Alert inline reemplazado por toasts */}
        <Form.Body className="space-y-6">
          <Form.Field>
            <PasswordInput
              id="currentPassword"
              label="Contraseña actual"
              value={form.currentPassword}
              onChange={(e) => handleChange("currentPassword", e.target.value)}
              error={errors.currentPassword}
              placeholder="••••••••"
              required
            />
          </Form.Field>
          <Form.Field>
            <PasswordInput
              id="newPassword"
              label="Nueva contraseña"
              value={form.newPassword}
              onChange={(e) => handleChange("newPassword", e.target.value)}
              error={errors.newPassword}
              placeholder="Nueva contraseña segura"
              required
            />
            <p className="mt-1 text-xs text-text-secondary">
              Debe incluir 8+ caracteres, mayúscula, minúscula, número y
              símbolo.
            </p>
          </Form.Field>
          <Form.Field>
            <PasswordInput
              id="confirmNewPassword"
              label="Confirmar nueva contraseña"
              value={form.confirmNewPassword}
              onChange={(e) =>
                handleChange("confirmNewPassword", e.target.value)
              }
              error={errors.confirmNewPassword}
              placeholder="Repite la nueva contraseña"
              required
            />
          </Form.Field>
        </Form.Body>
        <Form.Footer>
          <DentalButton
            type="submit"
            variant="primary"
            disabled={saving}
            isLoading={saving}
          >
            Cambiar contraseña
          </DentalButton>
        </Form.Footer>
      </Form>
    </Card>
  );
}
