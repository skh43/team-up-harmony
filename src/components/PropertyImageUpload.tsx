
import React, { useState } from 'react';
import { Camera, X, Upload, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

interface PropertyImageUploadProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  minImages?: number;
}

const ROOM_TYPES = [
  "Living Room",
  "Kitchen",
  "Master Bedroom",
  "Bedroom",
  "Bathroom",
  "Balcony/Outdoor",
  "Other"
];

const PropertyImageUpload: React.FC<PropertyImageUploadProps> = ({
  images,
  setImages,
  minImages = 6
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  
  // Check if we have enough images
  const hasMinImages = images.length >= minImages;
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    if (e.dataTransfer.files) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };
  
  const handleFiles = (files: File[]) => {
    // Filter for image files only
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    // Create object URLs for preview
    const newImageUrls = imageFiles.map(file => URL.createObjectURL(file));
    
    // Add the new images to the existing array
    setImages(prev => [...prev, ...newImageUrls]);
  };
  
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    if (activeIndex >= index && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };
  
  const addUrlImage = () => {
    const url = prompt("Enter image URL:");
    if (url && url.trim() !== "") {
      setImages(prev => [...prev, url.trim()]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">Property Images</h3>
          {!hasMinImages && (
            <span className="flex items-center text-destructive text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              Add at least {minImages} images
            </span>
          )}
          {hasMinImages && (
            <span className="flex items-center text-green-600 text-sm">
              <Check className="h-4 w-4 mr-1" />
              Minimum requirement met
            </span>
          )}
        </div>
        <span className="text-sm text-muted-foreground">
          {images.length} {images.length === 1 ? 'image' : 'images'} added
        </span>
      </div>

      {images.length > 0 && (
        <Carousel 
          className="w-full" 
          onSelect={(api) => setActiveIndex(api?.selectedScrollSnap() || 0)}
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
                <div className="relative rounded-md overflow-hidden aspect-video bg-muted">
                  <img 
                    src={image} 
                    alt={`Property ${index + 1}`} 
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  <button 
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full hover:bg-black/90"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 text-center">
                    {index === 0 ? "Main Photo" : `Photo ${index + 1}`}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-1" />
          <CarouselNext className="right-1" />
        </Carousel>
      )}

      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center",
          dragOver ? "border-primary bg-primary/5" : "border-muted-foreground/20",
          "transition-colors duration-200"
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <Camera className="h-10 w-10 text-muted-foreground/60" />
          <h3 className="text-lg font-medium">Upload Property Images</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Drag and drop your images here, or click to browse
          </p>
          
          <div className="flex gap-2 flex-wrap justify-center">
            <Button type="button" onClick={() => document.getElementById('image-upload')?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Browse Files
            </Button>
            <Button type="button" variant="outline" onClick={addUrlImage}>
              Add Image URL
            </Button>
          </div>
          
          <input
            id="image-upload"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
          
          <p className="text-xs text-muted-foreground mt-4">
            Tip: Include photos of all rooms, washrooms, kitchen, and exterior views
          </p>
          
          <div className="grid grid-cols-3 gap-2 mt-3">
            {ROOM_TYPES.map((room) => (
              <div key={room} className="text-xs bg-muted rounded px-2 py-1">
                {room}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyImageUpload;
