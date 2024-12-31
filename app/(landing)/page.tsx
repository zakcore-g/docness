"use client";

import Navbar from "../../components/landingpage/landingNavbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SignUpButton } from "@clerk/nextjs";

export default function LandingPage() {
  const features = [
    {
      title: "Pre-Built Document Templates",
      description: "Access a library of professionally designed templates for contracts, agreements, proposals, and more.",
      icon: "📄"
    },
    {
      title: "AI-Powered Document Generation",
      description: "Save time and reduce errors with automated content creation tailored to your inputs.",
      icon: "🤖"
    },
    {
      title: "Real-Time Collaboration",
      description: "Work with your team live, with synchronized editing, commenting, and AI suggestions.",
      icon: "👥"
    },
    {
      title: "Document Analytics",
      description: "Track views, edits, and user engagement to gain insights into document performance.",
      icon: "📊"
    }
  ];

  const faqs = [
    {
      question: "How does the AI document generation work?",
      answer: "Our AI analyzes your requirements and automatically generates professional documents using advanced language models and industry best practices."
    },
    {
      question: "Can I customize the templates?",
      answer: "Yes, all templates are fully customizable to match your brand and specific needs while maintaining professional standards."
    },
    {
      question: "Is my data secure?",
      answer: "We implement enterprise-grade security measures and encryption to ensure your documents and data remain completely confidential."
    }
  ];

  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true });
  const { ref: featuresRef, inView: featuresInView } = useInView({ triggerOnce: true });

  return (
    <div className="min-h-screen bg-[#fdf9ec]">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 20 }}
        transition={{ duration: 0.8 }}
        className="text-center py-16 md:py-24 px-4 bg-gradient-to-r from-[#999165] to-[#999165]/80"
      >
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Revolutionize Your Document Workflow
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            AI-powered document generation and collaboration tailored for your business needs.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SignUpButton>
              <Button 
                className="bg-[#fff300] text-black hover:bg-[#fff300]/90 text-lg px-8 py-6 rounded-md shadow-lg"
              >
                Get Started
              </Button>
            </SignUpButton>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4" id="features">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-[#999165] text-center mb-16">
            Key Features
          </h2>
          <div 
            ref={featuresRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: featuresInView ? 1 : 0, y: featuresInView ? 0 : 20 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="h-full"
              >
                <Card className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <CardHeader className="flex-none">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <CardTitle className="text-xl md:text-2xl font-semibold text-[#999165] mb-4">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white/50 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-[#999165] text-center mb-12">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-[#999165] hover:text-[#999165]/80">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#999165]/10 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-[#999165] mb-6">
            Ready to Transform Your Document Workflow?
          </h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SignUpButton>
              <Button 
                className="bg-[#fff300] text-black hover:bg-[#fff300]/90 text-lg px-8 py-6 rounded-md shadow-lg"
              >
                Try for Free
              </Button>
            </SignUpButton>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#999165] text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            © 2024 DocNet. All rights reserved. | 
            <a href="#privacy-policy" className="text-[#fff300] hover:text-[#fff300]/80 ml-2 transition-colors duration-300">
              Privacy Policy
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
} 