import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Shield, Clock, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-32 text-center px-4">
    <Badge className="mb-6 bg-green-100 dark:bg-green-300 text-blue-700 dark:text-blue-700">
      <Zap className="w-3 h-3 mr-1" /> AI-Powered Document Intelligence
    </Badge>

      <h1 className="font-bold text-3xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white mb-6 leading-tight">
        Transform Your PDFs into{" "}
        <span className="text-blue-600 dark:text-blue-400">Conversational Allies</span>
      </h1>

      <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
        Engage with your documents using AI. Upload any PDF and start having intelligent conversations instantly.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/chat">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
            Start Chatting Now <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>

      {/* Features List */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-slate-500 dark:text-slate-400">
        <div className="flex items-center"><Shield className="w-4 h-4 mr-1" /> Secure</div>
        <div className="flex items-center"><Clock className="w-4 h-4 mr-1" /> Instant</div>
        <div className="flex items-center"><Star className="w-4 h-4 mr-1" /> AI-Powered</div>
      </div>
    </section>
  );
}