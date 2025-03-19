
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  className?: string;
}

const BackButton = ({ className }: BackButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Don't render on the index page
  if (location.pathname === '/') {
    return null;
  }
  
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Button
      onClick={handleGoBack}
      variant="ghost"
      size="sm"
      className={`flex items-center gap-2 ${className}`}
      aria-label="Go back to previous page"
    >
      <ArrowLeft className="h-4 w-4" />
      <span>Go Back</span>
    </Button>
  );
};

export default BackButton;
