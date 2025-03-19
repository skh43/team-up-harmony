
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
import { Mail, Phone, MapPin, Send, MessageSquare, ArrowRight } from "lucide-react";
import MainLayout from '@/layouts/MainLayout';
import { motion } from 'framer-motion';

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

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <MainLayout className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50/50 via-white to-blue-50/30">
      <div className="w-full max-w-7xl mx-auto px-4 py-16">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-royal">
            Get in Touch
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We're here to answer any questions you might have. Feel free to reach out and we'll respond as soon as possible.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden shadow-elegant hover:shadow-card-hover transition-all duration-300 border-0 bg-gradient-to-br from-white to-purple-50/30 backdrop-blur-sm h-full">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#01CDFA] to-[#516CF7] rounded-full flex items-center justify-center mb-5 shadow-glow-sm">
                  <Mail className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Email Us</h3>
                <p className="text-muted-foreground mb-4">For general inquiries and support</p>
                <a href="mailto:contact@roomateharmony.com" className="text-[#516CF7] hover:text-[#01CDFA] transition-colors font-medium hover:underline flex items-center gap-1 group">
                  contact@roomateharmony.com
                  <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </a>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden shadow-elegant hover:shadow-card-hover transition-all duration-300 border-0 bg-gradient-to-br from-white to-violet-50/30 backdrop-blur-sm h-full">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#8563C9] to-[#ED2FC0] rounded-full flex items-center justify-center mb-5 shadow-glow-sm">
                  <Phone className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Call Us</h3>
                <p className="text-muted-foreground mb-4">Monday to Friday, 9am - 6pm</p>
                <a href="tel:+966123456789" className="text-[#A83ACB] hover:text-[#ED2FC0] transition-colors font-medium hover:underline flex items-center gap-1 group">
                  +966 12 345 6789
                  <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </a>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden shadow-elegant hover:shadow-card-hover transition-all duration-300 border-0 bg-gradient-to-br from-white to-amber-50/30 backdrop-blur-sm h-full">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FFB347] to-[#FF9900] rounded-full flex items-center justify-center mb-5 shadow-glow-sm">
                  <MapPin className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Visit Us</h3>
                <p className="text-muted-foreground mb-4">Our headquarters</p>
                <address className="not-italic text-amber-600 hover:text-amber-500 transition-colors font-medium">
                  King Fahd Road, Riyadh<br />
                  Saudi Arabia
                </address>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gradient-primary">Send Us a Message</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              We'd love to hear from you. Please fill out the form below with your inquiry.
            </p>
            
            <Card className="shadow-elegant border-0 overflow-hidden bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium text-gray-700">Full Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="John Doe" 
                              {...field} 
                              className="border-gray-200 focus:border-[#516CF7] focus:ring-[#516CF7]/10 transition-all" 
                            />
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
                          <FormLabel className="font-medium text-gray-700">Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="name@example.com" 
                              {...field} 
                              className="border-gray-200 focus:border-[#516CF7] focus:ring-[#516CF7]/10 transition-all" 
                            />
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
                          <FormLabel className="font-medium text-gray-700">Subject</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="How can we help you?" 
                              {...field} 
                              className="border-gray-200 focus:border-[#516CF7] focus:ring-[#516CF7]/10 transition-all" 
                            />
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
                          <FormLabel className="font-medium text-gray-700">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please provide details about your inquiry..." 
                              className="min-h-32 border-gray-200 focus:border-[#516CF7] focus:ring-[#516CF7]/10 transition-all resize-none" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full gradient-primary text-white hover:shadow-lg transition-all duration-300"
                      disabled={isLoading}
                      variant="gradient"
                      size="lg"
                    >
                      {isLoading ? (
                        <>
                          <div className="h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <MessageSquare className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            className="h-[600px] rounded-2xl overflow-hidden shadow-elegant relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 pointer-events-none z-10 rounded-2xl"></div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.674457351142!2d46.672576615013746!3d24.713454184128086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sKing%20Fahd%20Rd%2C%20Riyadh%20Saudi%20Arabia!5e0!3m2!1sen!2sus!4v1647395381244!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              loading="lazy" 
              title="Our Location"
              className="grayscale-[20%] hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
