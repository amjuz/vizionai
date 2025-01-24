import Configuration from "@/components/image-generation/Configuration";
import GeneratedComponents from "@/components/image-generation/GeneratedComponents";

const ImageGeneration = () => {
  return (
    <section className="container mx-auto grid gap-4 grid-cols-3 overflow-hidden">
      <Configuration />

      <div className="col-span-2 p-4 rounded-xl flex items-center justify-center h-fit">
        <GeneratedComponents />
      </div>
    </section>
  );
};

export default ImageGeneration;
