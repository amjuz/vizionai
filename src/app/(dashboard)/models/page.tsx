import { fetchModel } from "@/app/actions/model-actions"
import ModelList from "@/components/models/form/model-list"

const page = async () => {
  const data = await fetchModel()
  // console.log(data);
  
    return (
      <section className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Models</h1>
          <p className="mt-2 text-muted-foreground">
            View and manage your trained model
          </p>
        </div>
        <ModelList models={data}/>
      </section>
    )
  }
  
  export default page