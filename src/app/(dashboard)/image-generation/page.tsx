import { fetchModel } from "@/app/actions/model-actions";
import Configuration from "@/components/image-generation/Configuration";
import GeneratedComponents from "@/components/image-generation/GeneratedComponents";

interface searchParams {
  model_id?: string 
}

const ImageGeneration = async ({ searchParams }:{searchParams:Promise<searchParams>}) => {
  const model_id = (await searchParams).model_id
  const {data: userModels} = await fetchModel()

  return (
    <section className="container mx-auto grid gap-4 grid-cols-3 overflow-hidden">
      <Configuration userModels={userModels || []} modelId={model_id}/>

      <div className="col-span-2 p-4 rounded-xl flex items-center justify-center h-fit">
        <GeneratedComponents />
      </div>
    </section>
  );
};

export default ImageGeneration;
