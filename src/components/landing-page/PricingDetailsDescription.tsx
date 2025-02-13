import { Check } from "lucide-react";
import { TGetProductsNonNull } from "./PricingDetails";

export default function PricingDetailsDescription({
  product,
}: {
  product: TGetProductsNonNull[number];
}) {
  return (
    <div className="pt-6 px-6 pb-8">
      <h3 className="uppercase text-wide text-foreground font-medium text-sm">
        What&apos;s included
      </h3>
      <ul className="mt-6 space-y-4">
        {Object.values(product.metadata ?? {}).map((feature, index) => {
          if (feature) {
            return (
              <li key={index} className="flex space-x-3">
                <Check className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
