import Navbar from "../custom/components/landing/Navbar";
import Hero from "../custom/components/landing/Hero";
import Features from "../custom/components/landing/Features";
import Roles from "../custom/components/landing/Roles";
import Footer from "../custom/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Roles />
      </main>
      <Footer />
    </>
  );
}
