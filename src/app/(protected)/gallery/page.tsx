import { getImages } from "@/app/actions/image-action";
import GalleryComponent, { ImageProps } from "@/components/gallery/GalleryComponent";

const Gallery = async () => {
  const images = await getImages();
  if(!images) console.log("returned empty image object");
  
  return (
    <section className="container mx-auto">
      <h1 className="text-3xl font-semibold mb-2">My Images</h1>
      <p className="text-muted-foreground mb-6">
        Here you can see all the images you have generated. Click on the image
        to view details.
      </p>
      <GalleryComponent images={images as ImageProps[]} />
    </section>
  );
};

export default Gallery;
