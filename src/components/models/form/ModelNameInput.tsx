import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { TModelTrainingForm } from "../ModelTrainingForm";

const ModelNameInput = ({ form }: TModelTrainingForm) => {
  return (
    <FormField
      control={form.control}
      name="modelName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Model Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter model name" {...field} />
          </FormControl>
          <FormDescription>
            This will be the name of your trained model.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ModelNameInput;
