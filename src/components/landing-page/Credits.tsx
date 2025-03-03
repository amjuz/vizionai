import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export default function Credits() {
  return (
    <section className="mt-16 w-full bg-muted py-16">
      <div className="container px-6 xs:px-8 sm:mx-auto sm:px-0">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="subHeading font-bold">
            Ready to transform your photos?
          </h2>
          <p className="subText mt-4 text-center">
            Join thousands of users who are already creating amazing
            AI-generated images.
          </p>
          <div className="pt-5">
            <Link
              href={"/auth/login"}
              className={cn(
                buttonVariants({
                  className: "h-12 rounded-md text-base",
                }),
              )}
            >
              🌟 Create your first AI model 🌟
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
