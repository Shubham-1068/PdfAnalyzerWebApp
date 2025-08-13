import Features from "./features"
import Header from "./header"
import Hero from "./hero"
import Footer from "./footer"


export default function LandingPage() {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Header />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}
