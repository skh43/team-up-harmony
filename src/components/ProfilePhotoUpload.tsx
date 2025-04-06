
import React, { useState, useRef } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ProfilePhotoUploadProps {
  image: string | null;
  setImage: (image: string | null) => void;
}

const ProfilePhotoUpload: React.FC<ProfilePhotoUploadProps> = ({
  image,
  setImage
}) => {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
      }
    }
  };

  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h3 className="font-medium self-start">Profile Photo</h3>
      
      {image ? (
        <div className="relative">
          <Avatar className="h-24 w-24">
            <AvatarImage src={image} alt="Profile" />
            <AvatarFallback>
              {/* User initials fallback */}
              <Camera className="h-8 w-8 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <button 
            type="button"
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-black/70 text-white p-1 rounded-full hover:bg-black/90"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center w-full",
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
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop your photo here, or click to browse
            </p>
            
            <Button type="button" onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Photo
            </Button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoUpload;
