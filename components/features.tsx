import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, MessageCircle, Zap } from "lucide-react"; 

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-bold text-3xl lg:text-4xl text-slate-900 dark:text-white mb-4">
            Why Choose PDFChat?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Experience the future of document interaction with our cutting-edge features
          </p>
        </div>

        
        <section id="features" className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-bold text-3xl lg:text-4xl text-slate-900 dark:text-white mb-4">Why Choose PDFChat?</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Experience the future of document interaction with our cutting-edge features
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Upload className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-4">Upload Your PDFs Effortlessly</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Simple drag-and-drop functionality makes uploading your documents quick and intuitive. Support for all
                  PDF formats and sizes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-8 h-8 text-sky-600" />
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-4">AI-Powered Conversations</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Get instant insights and answers from your documents through natural language conversations. Ask
                  questions, request summaries, and explore content.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-4">Seamless User Experience</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Intuitive design for effortless navigation. Fast processing, smart responses, and a clean interface
                  that gets out of your way.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
       
      </div>
    </section>
  );
};

export default Features;