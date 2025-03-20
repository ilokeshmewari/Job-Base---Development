import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {


  return (
    <html lang="en">
      <head>
      {/*<meta name="monetag" content="bf541f80b3e644fc4b770690cbffe5e2" />
        <title>Job Base</title>
        <script
          async
          src="https://js.wpadmngr.com/static/adManager.js"
          data-admpid="295943"
        ></script>
        <script src="https://kulroakonsu.net/88/tag.min.js" data-zone="132627" async data-cfasync="false"></script> */}
      </head>
      <body>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto p-4">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
