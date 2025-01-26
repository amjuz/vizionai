import { TrainModelValidator } from "@/lib/validators/modelTraining";
import { z } from "zod";

export type TTrainModelValidator = z.infer<typeof TrainModelValidator>