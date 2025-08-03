"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { X } from "lucide-react";
import { ContactBody, EditContactBody, Contact } from "@/lib/types";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface ContactFormProps {
  contact?: Contact | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ContactBody | EditContactBody) => Promise<void>;
}

export default function ContactForm({
  contact,
  isOpen,
  onClose,
  onSubmit,
}: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactBody>({
    defaultValues: contact
      ? {
          firstName: contact.firstName,
          lastName: contact.lastName,
          zipCode: contact.zipCode,
          dateOfBirth: contact.dateOfBirth,
        }
      : {
          firstName: "",
          lastName: "",
          zipCode: "",
          dateOfBirth: "",
        },
  });

  // Update form values when contact changes (for editing)
  useEffect(() => {
    if (contact) {
      reset({
        firstName: contact.firstName,
        lastName: contact.lastName,
        zipCode: contact.zipCode,
        dateOfBirth: contact.dateOfBirth,
      });
    } else {
      reset({
        firstName: "",
        lastName: "",
        zipCode: "",
        dateOfBirth: "",
      });
    }
  }, [contact, reset]);

  const handleFormSubmit = async (data: ContactBody) => {
    try {
      if (contact) {
        // For editing, include the ID and make optional fields
        const editData: EditContactBody = {
          Id: contact.id,
          firstName: data.firstName,
          lastName: data.lastName,
          zipCode: data.zipCode,
          dateOfBirth: data.dateOfBirth,
        };
        await onSubmit(editData);
      } else {
        // For new contact
        await onSubmit(data);
      }

      onClose();
    } catch (error) {
      // Error is handled in parent component
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-300">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="relative bg-black border border-white/20 w-full max-w-md mx-4 p-8 animate-in slide-in-from-bottom-8 fade-in duration-500 shadow-2xl shadow-white/5">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-light text-white animate-in slide-in-from-left duration-700">
            {contact ? "edit person" : "new person"}
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-0 hover:rotate-90 transition-transform duration-300"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
          <div className="space-y-6">
            <div className="animate-in slide-in-from-right duration-500 delay-100">
              <Input
                label="first name"
                {...register("firstName", {
                  required: "First name is required",
                })}
                error={errors.firstName?.message}
              />
            </div>
            <div className="animate-in slide-in-from-right duration-500 delay-200">
              <Input
                label="last name"
                {...register("lastName", {
                  required: "Last name is required",
                })}
                error={errors.lastName?.message}
              />
            </div>
            <div className="animate-in slide-in-from-right duration-500 delay-300">
              <Input
                label="zip code"
                {...register("zipCode", {
                  required: "Zip code is required",
                })}
                error={errors.zipCode?.message}
              />
            </div>
            <div className="animate-in slide-in-from-right duration-500 delay-400">
              <Input
                label="date of birth"
                type="date"
                {...register("dateOfBirth", {
                  required: "Date of birth is required",
                })}
                error={errors.dateOfBirth?.message}
              />
            </div>
          </div>

          <div className="flex justify-between pt-8 animate-in slide-in-from-bottom duration-500 delay-500">
            <Button type="button" variant="ghost" onClick={onClose}>
              cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              {contact ? "save changes" : "add person"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
