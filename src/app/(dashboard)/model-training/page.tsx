import ModelTrainingForm from "@/components/models/ModelTrainingForm";

const page = () => {
  return (
    <section className="container mx-auto">
      <h1 className="text-3xl font-bold mb-2"></h1>
      <p className="text-sm text-muted-foreground mb-6">
        Train a model with your own images
      </p>
      <ModelTrainingForm />
    </section>
  );
};

export default page;
