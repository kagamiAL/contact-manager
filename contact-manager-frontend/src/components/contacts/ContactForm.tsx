"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import type { Contact, ContactBody, EditContactBody } from "@/lib/types";

interface ContactFormProps {
  contact?: Contact;
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
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactBody>();

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

  if (!isOpen) return null;

  const handleFormSubmit = async (data: ContactBody) => {
    try {
      if (contact) {
        await onSubmit({ ...data, Id: contact.id } as EditContactBody);
      } else {
        await onSubmit(data);
      }
      onClose();
    } catch (error) {
      // Error is handled in parent component
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="relative inline-block align-bottom bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full z-10">
          <div className="bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                {contact ? "Edit Contact" : "Add New Contact"}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-1"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  error={errors.firstName?.message}
                />
                <Input
                  label="Last Name"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  error={errors.lastName?.message}
                />
              </div>

              <Input
                label="Zip Code"
                {...register("zipCode", {
                  required: "Zip code is required",
                })}
                error={errors.zipCode?.message}
              />

              <Input
                label="Date of Birth"
                type="date"
                {...register("dateOfBirth", {
                  required: "Date of birth is required",
                })}
                error={errors.dateOfBirth?.message}
              />

              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="secondary" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" loading={isSubmitting}>
                  {contact ? "Update Contact" : "Add Contact"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
