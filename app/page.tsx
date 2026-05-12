import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import Roles from "../components/landing/Roles";
import Footer from "../components/landing/Footer";

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
