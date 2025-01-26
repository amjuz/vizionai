import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TModelTrainingForm } from "../ModelTrainingForm";
import { Input } from "@/components/ui/input";

const FileUploadInputBox = ({ form }: TModelTrainingForm) => {
  const fileRef = form.register("zipFile");

  return (
    <FormField
      control={form.control}
      name="zipFile"
      render={() => (
        <FormItem>
          <FormLabel>
            Training data (Zip file) |{" "}
            <span className="text-destructive">
              Read the requirements below
            </span>
          </FormLabel>
          <div className="mb-4 rounded-lg shadow-sm pb-4 text-card-foreground">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Provide 10, 12 or 15 images in total</li>
              <li>• Ideal breakdown for 12 images:</li>

              <ul className="ml-4 mt-1 space-y-1">
                <li>- 6 face closeups</li>
                <li>- 3/4 half body closeups (till stomach)</li>
                <li>- 2/3 full body shots</li>
              </ul>

              <li>• No accessories on face/head ideally</li>
              <li>• No other people in images</li>
              <li>
                • Different expressions, clothing, backgrounds with good
                lighting
              </li>
              <li>• Images to be in 1:1 resolution (1048x1048 or higher)</li>
              <li>
                • Use images of similar age group (ideally within past few
                months)
              </li>
              <li>• Provide only zip file (under 45MB size)</li>
            </ul>
          </div>
          <FormControl>
            <Input
              type="file"
              accept=".zip"
              placeholder="Enter model name"
              {...fileRef}
              // onChange={e  => field.onChange(e.target.files)}
            />
          </FormControl>
          <FormDescription>
            Upload a zip file containing you training images (max 45MB).
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FileUploadInputBox;
