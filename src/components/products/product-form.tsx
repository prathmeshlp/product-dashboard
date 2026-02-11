import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/lib/validations";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { uploadService } from "@/services/upload.service";
import { useState } from "react";

type ProductFormValues = z.infer<typeof productSchema>;

interface Props {
  defaultValues?: Partial<ProductFormValues>;
  onSubmit: (data: ProductFormValues) => Promise<void>;
}

const ProductForm = ({ defaultValues, onSubmit }: Props) => {
  const [uploadProgress, setUploadProgress] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadService.uploadImage(file, setUploadProgress);
    setValue("thumbnail", url);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input placeholder="Title" {...register("title")} />
      <p className="text-red-500 text-sm">{errors.title?.message}</p>

      <Input type="number" {...register("price", { valueAsNumber: true })} />

      <Input type="file" accept="image/*" onChange={handleFileUpload} />
      {uploadProgress > 0 && <p>Uploading: {uploadProgress}%</p>}

      <Button disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
    </form>
  );
};

export default ProductForm;
