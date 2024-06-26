import { Footer } from "../components/footer";
import Navbar from "../components/navbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout(props: MainLayoutProps) {
  const { children } = props;

  const navItems = [
    { name: "Features", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "FAQ", href: "#" },
  ];
  const cta = { name: "Log in", href: "#" };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar items={navItems} cta={cta} />
      <main className="flex-grow bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
