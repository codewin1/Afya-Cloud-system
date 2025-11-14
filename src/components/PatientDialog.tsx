import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const patientSchema = z.object({
  patient_id: z.string().trim().min(1, "Patient ID is required").max(50),
  full_name: z.string().trim().min(2, "Full name is required").max(100),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  phone_number: z.string().trim().max(15).optional().or(z.literal("")),
  email: z.string().trim().email("Invalid email").max(255).optional().or(z.literal("")),
  county: z.string().trim().min(1, "County is required").max(50),
  sub_county: z.string().trim().max(50).optional().or(z.literal("")),
  ward: z.string().trim().max(50).optional().or(z.literal("")),
  village: z.string().trim().max(50).optional().or(z.literal("")),
  blood_type: z.string().trim().max(5).optional().or(z.literal("")),
  allergies: z.string().trim().max(500).optional().or(z.literal("")),
  chronic_conditions: z.string().trim().max(500).optional().or(z.literal("")),
  emergency_contact_name: z.string().trim().max(100).optional().or(z.literal("")),
  emergency_contact_phone: z.string().trim().max(15).optional().or(z.literal("")),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

type PatientFormData = z.infer<typeof patientSchema>;

interface PatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient?: any;
}

export function PatientDialog({ open, onOpenChange, patient }: PatientDialogProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
  });

  useEffect(() => {
    if (patient) {
      Object.keys(patient).forEach((key) => {
        setValue(key as any, patient[key] || "");
      });
    } else {
      reset();
    }
  }, [patient, setValue, reset]);

  const mutation = useMutation({
    mutationFn: async (data: PatientFormData) => {
      if (patient) {
        const { error } = await supabase
          .from("patients")
          .update(data)
          .eq("id", patient.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("patients").insert([{
          ...data,
          created_by: user!.id,
        } as any]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      toast.success(patient ? "Patient updated successfully" : "Patient added successfully");
      onOpenChange(false);
      reset();
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });

  const onSubmit = (data: PatientFormData) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{patient ? "Edit Patient" : "Add New Patient"}</DialogTitle>
          <DialogDescription>
            {patient ? "Update patient information" : "Register a new patient in the system"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="patient_id">Patient ID *</Label>
              <Input id="patient_id" {...register("patient_id")} />
              {errors.patient_id && (
                <p className="text-sm text-destructive">{errors.patient_id.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name *</Label>
              <Input id="full_name" {...register("full_name")} />
              {errors.full_name && (
                <p className="text-sm text-destructive">{errors.full_name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="date_of_birth">Date of Birth *</Label>
              <Input id="date_of_birth" type="date" {...register("date_of_birth")} />
              {errors.date_of_birth && (
                <p className="text-sm text-destructive">{errors.date_of_birth.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender *</Label>
              <Select onValueChange={(value) => setValue("gender", value)} defaultValue={patient?.gender}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-sm text-destructive">{errors.gender.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input id="phone_number" {...register("phone_number")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="county">County *</Label>
              <Input id="county" {...register("county")} />
              {errors.county && (
                <p className="text-sm text-destructive">{errors.county.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="sub_county">Sub-County</Label>
              <Input id="sub_county" {...register("sub_county")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ward">Ward</Label>
              <Input id="ward" {...register("ward")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="village">Village</Label>
              <Input id="village" {...register("village")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="blood_type">Blood Type</Label>
              <Input id="blood_type" {...register("blood_type")} placeholder="e.g., A+" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergency_contact_name">Emergency Contact Name</Label>
              <Input id="emergency_contact_name" {...register("emergency_contact_name")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergency_contact_phone">Emergency Contact Phone</Label>
              <Input id="emergency_contact_phone" {...register("emergency_contact_phone")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="allergies">Allergies</Label>
            <Textarea id="allergies" {...register("allergies")} rows={2} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="chronic_conditions">Chronic Conditions</Label>
            <Textarea id="chronic_conditions" {...register("chronic_conditions")} rows={2} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" {...register("notes")} rows={3} />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Saving..." : patient ? "Update" : "Add Patient"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
