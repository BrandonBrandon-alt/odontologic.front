"use client";
import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import Card from "@/components/ui/Card";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import DentalButton from "@/components/ui/Button";
import Alert from "@/components/ui/Alert"; // mantengo por compat pero ya no se usa inline
import { useToast } from "@/components/ui/ToastProvider";
import { userService } from "@/services/user.service";
import { motion } from "framer-motion";

const initialState = { name: "", phone: "", address: "", birth_date: "" };

const validators = {
  name: (v) => {
    if (!v) return ""; // optional update
    if (v.trim().length < 2)
      return "El nombre debe tener al menos 2 caracteres";
    if (v.trim().length > 100)
      return "El nombre no puede exceder 100 caracteres";
    return "";
  },
  phone: (v) => {
    if (!v) return "";
    if (!/^[0-9]{10}$/.test(v))
      return "El teléfono debe tener exactamente 10 dígitos";
    return "";
  },
  address: (v) => {
    if (!v) return "";
    if (v.length > 255) return "La dirección no puede exceder 255 caracteres";
    return "";
  },
  birth_date: (v) => {
    if (!v) return "";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(v))
      return "Formato de fecha inválido (YYYY-MM-DD)";
    return "";
  },
};

export default function ProfileForm({ onUpdated, compact = false }) {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);
  const [success, setSuccess] = useState(false);
  const { updateUser } = useAuth();
  const { show: showToast } = useToast();
  const firstErrorRef = useRef(null);
  const loadedRef = useRef(null); // snapshot para diff

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const profile = await userService.getProfile();
        const next = {
          name: profile.name || "",
          phone: profile.phone || "",
          address: profile.address || "",
          birth_date: profile.birth_date
            ? profile.birth_date.substring(0, 10)
            : "",
        };
        setForm(next);
        loadedRef.current = next;
      } catch (e) {
        setAlert(
          e.response?.data?.message || e.message || "Error al cargar perfil"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validateAll = () => {
    const errs = {};
    Object.entries(validators).forEach(([k, fn]) => {
      const msg = fn(form[k]);
      if (msg) errs[k] = msg;
    });
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);
    setSuccess(false);
    const errs = validateAll();
    if (Object.keys(errs).length) {
      setErrors(errs);
      // focus primer campo con error
      const firstKey = Object.keys(errs)[0];
      const el = document.getElementById(firstKey);
      if (el) el.focus();
      return;
    }

    // Build payload with only changed / non-empty fields
    const payload = {};
    Object.keys(form).forEach((k) => {
      if (form[k] !== "") payload[k] = form[k];
    });
    // Evitar submit si no hay cambios reales
    const noChanges = Object.keys(payload).every(
      (k) => loadedRef.current && loadedRef.current[k] === payload[k]
    );
    if (noChanges) {
      setAlert("No hay cambios para guardar");
      setSuccess(false);
      return;
    }

    try {
      setSaving(true);
      const { user, message } = await userService.updateProfile(payload);
      const msg = message || "Perfil actualizado";
      setAlert(msg);
      setSuccess(true);
      updateUser(user);
      if (onUpdated) onUpdated(user);
      showToast({ type: "success", message: msg, autoCloseMs: 4000 });
    } catch (e) {
      const errMsg =
        e.response?.data?.message || e.message || "Error al actualizar";
      setAlert(errMsg);
      showToast({ type: "error", message: errMsg, autoCloseMs: 6000 });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className={`${compact ? "p-4" : "p-6"} relative`} shadow="md">
      <Form onSubmit={handleSubmit} isLoading={saving} isSuccess={success}>
        <Form.Header title="Perfil" description="Actualiza tu información" />
        {/* Eliminado Alert inline: ahora se muestran como toast; conservamos estado para accesibilidad interna */}
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        ) : (
          <Form.Body className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Field>
              <Input
                id="name"
                label="Nombre"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                error={errors.name}
                placeholder="Nombre completo"
              />
            </Form.Field>
            <Form.Field>
              <Input
                id="phone"
                label="Teléfono (10 dígitos)"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                error={errors.phone}
                placeholder="3001234567"
              />
            </Form.Field>
            <Form.Field className="md:col-span-2">
              <Input
                id="address"
                label="Dirección"
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
                error={errors.address}
                placeholder="Calle 123 #45-67"
              />
            </Form.Field>
            <Form.Field>
              <Input
                id="birth_date"
                label="Fecha de nacimiento"
                type="date"
                value={form.birth_date}
                onChange={(e) => handleChange("birth_date", e.target.value)}
                error={errors.birth_date}
              />
            </Form.Field>
          </Form.Body>
        )}
        <Form.Footer>
          <DentalButton
            type="submit"
            variant="primary"
            disabled={saving}
            isLoading={saving}
          >
            Guardar cambios
          </DentalButton>
        </Form.Footer>
      </Form>
    </Card>
  );
}
