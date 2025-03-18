
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Check, CreditCard, Calendar, Lock } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [planPrice, setPlanPrice] = useState<string>('');
  
  useEffect(() => {
    // Get the selected plan from localStorage
    const plan = localStorage.getItem('livingPlan');
    if (!plan || plan === 'basic') {
      // Redirect to path selection if no plan is found or it's basic
      navigate('/path-selection');
      return;
    }
    
    setSelectedPlan(plan);
    setPlanPrice(plan === 'comfort' ? 'SAR 29.99' : 'SAR 59.99');
  }, [navigate]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      toast({
        title: "Payment successful",
        description: `Your ${selectedPlan?.charAt(0).toUpperCase()}${selectedPlan?.slice(1)} Living plan is now active!`,
        variant: "default",
      });
      
      // After successful payment, navigate to path selection
      navigate('/path-selection');
    }, 1500);
  };
  
  const handleBack = () => {
    navigate('/living-plan-selection');
  };

  if (!selectedPlan) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  return (
    <MainLayout className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md pt-16">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center"
          onClick={handleBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Plans
        </Button>
        
        <Card className="w-full shadow-elegant">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Complete Payment</CardTitle>
            <CardDescription>
              Enter your payment details to activate your{' '}
              <span className="font-medium capitalize">{selectedPlan} Living</span> plan
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6">
                {/* Plan Summary */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium capitalize">{selectedPlan} Living Plan</p>
                      <p className="text-sm text-muted-foreground">Monthly Subscription</p>
                    </div>
                    <p className="font-bold">{planPrice}</p>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between items-center font-bold">
                    <p>Total</p>
                    <p>{planPrice}</p>
                  </div>
                </div>
                
                {/* Card Information */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <div className="relative">
                      <Input 
                        id="cardNumber" 
                        placeholder="0000 0000 0000 0000" 
                        required
                      />
                      <CreditCard className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <div className="relative">
                        <Input 
                          id="expiryDate" 
                          placeholder="MM/YY" 
                          required
                        />
                        <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <div className="relative">
                        <Input 
                          id="cvv" 
                          placeholder="123" 
                          required
                        />
                        <Lock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Name on Card</Label>
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      required
                    />
                  </div>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full mt-6"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : `Pay ${planPrice}`}
              </Button>
              
              <div className="mt-4 text-center text-sm text-muted-foreground flex items-center justify-center gap-1">
                <Lock className="h-3 w-3" /> Secure payment powered by Stripe
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Payment;
