import { z } from "zod";    
import { TrainModelValidator } from "@/lib/validators/modelTraining";

export type TTrainModelValidator = z.infer<typeof TrainModelValidator>