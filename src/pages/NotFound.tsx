import { GalleryVerticalEnd } from "lucide-react"
import Button from "@/components/ui/Button"

export const NotFound = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Swimm App
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md text-center">
        
            <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-muted-foreground mb-4">¡Ups! Parece que te perdiste en aguas profundas</h2>
      
            <Button 
              to="/"
              size="lg"
              className="w-full md:w-auto"
            >
              Volver a aguas seguras
            </Button>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="https://videocdn.cdnpk.net/videos/b5b71195-6ea9-4f76-9e4b-aded345e61a6/horizontal/thumbnails/large.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};
