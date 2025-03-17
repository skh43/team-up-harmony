
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import MainLayout from '@/layouts/MainLayout';

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject is required"),
  message: z.string().min(10, "Message is too short"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setIsLoading(true);
      // Simulate API call
      console.log("Contact form data:", data);
      
      // Show success toast
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Message sending failed",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout className="flex flex-col min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions or need assistance? Get in touch with our team and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="overflow-hidden shadow-subtle hover:shadow-elegant transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Email Us</h3>
              <p className="text-muted-foreground mb-3">For general inquiries and support</p>
              <a href="mailto:contact@roomateharmony.com" className="text-blue-600 hover:underline">contact@roomateharmony.com</a>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden shadow-subtle hover:shadow-elegant transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Call Us</h3>
              <p className="text-muted-foreground mb-3">Monday to Friday, 9am - 6pm</p>
              <a href="tel:+966123456789" className="text-purple-600 hover:underline">+966 12 345 6789</a>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden shadow-subtle hover:shadow-elegant transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Visit Us</h3>
              <p className="text-muted-foreground mb-3">Our headquarters</p>
              <address className="not-italic text-amber-600">
                King Fahd Road, Riyadh<br />
                Saudi Arabia
              </address>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
            <p className="text-muted-foreground mb-6">
              Fill out the form below and our team will get back to you as soon as possible.
            </p>
            
            <Card className="shadow-elegant border-0 overflow-hidden">
              <CardContent className="p-6 pt-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium">Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium">Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="name@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium">Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="How can we help you?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please provide details about your inquiry..." 
                              className="min-h-32" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={isLoading}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      {isLoading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          <div className="hidden md:block h-[500px] rounded-lg overflow-hidden shadow-elegant">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.674457351142!2d46.672576615013746!3d24.713454184128086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sKing%20Fahd%20Rd%2C%20Riyadh%20Saudi%20Arabia!5e0!3m2!1sen!2sus!4v1647395381244!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              loading="lazy" 
              title="Our Location"
            ></iframe>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
