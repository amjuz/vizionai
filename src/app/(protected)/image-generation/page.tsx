import { fetchModel } from "@/app/actions/model-actions";
import Configuration from "@/components/image-generation/Configuration";
import GeneratedComponents from "@/components/image-generation/GeneratedComponents";

interface searchParams {
  model_id?: string;
}

const ImageGeneration = async ({
  searchParams,
}: {
  searchParams: Promise<searchParams>;
}) => {
  const model_id = (await searchParams).model_id;
  const { data: userModels } = await fetchModel();

  return (
    <section className="container mx-auto grid grid-cols-1 gap-4 overflow-hidden xl:grid-cols-3">
      <Configuration userModels={userModels || []} modelId={model_id} />

      <div className="col-span-2 flex h-fit items-center justify-center rounded-xl p-0 lg:p-4">
        <GeneratedComponents />
      </div>
    </section>
  );
};

export default ImageGeneration;
