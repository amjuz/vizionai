import ModelTrainingForm from "@/components/models/ModelTrainingForm";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const page = () => {
  return (
    <section className="container mx-auto">
      <div className="border bg-destructive p-4 font-bold text-white flex items-center justify-between max-w-6xl">
        <div className="">
          <p>
            Currently model training feature is disabled, as it uses lot of our
            resources.
          </p>
          <p className="">
            For the time being you can enjoy image generation feature. And yes
            its completely free until you reach your daily limit
          </p>
        </div>
        <div className="">
          <Link
            href="/image-generation"
            className={cn(
              buttonVariants({ variant: "default", className: "bg-green-600" }),
            )}
          >
            Generate Images
          </Link>
        </div>
      </div>

      <h1 className="mb-2 text-3xl font-bold"></h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Train a model with your own images
      </p>
      <ModelTrainingForm />
    </section>
  );
};

export default page;
