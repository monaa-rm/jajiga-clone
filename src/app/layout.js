import "./globals.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeaderMenuList from "@/components/header/header-menu-list";
import ReduxToolkitProvider from "@/providers/reduxtoolkitProviders";
import "react-tooltip/dist/react-tooltip.css";
import SignInSection from "@/components/sign-in";
import { NextAuthProvider } from "@/components/layout/nextuthProvider";
import { ToastContainer } from "react-toastify";
import SplashScreenProvider from "@/providers/splashScreenProvider";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export async function generateMetadata({ params }) {
  const siteURL = "http://localhost:3000";
  return {
    title: `اجاره ویلا و آپارتمان در سراسر ایران`,
    description: `اجاره ویلا و آپارتمان در سراسر ایران زیبا`,
    alternates: {
      canonical: `${siteURL}`,
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="ltr">
      <body className="relative ">
        <ReduxToolkitProvider>
          <SplashScreenProvider>
            <NextAuthProvider>
              <>
                <meta charset="utf-8" />
                <link
                  rel="shortcut icon"
                  href="/images/favicon.ico"
                  type="image/x-icon"
                />
              </>

              <HeaderMenuList />
              <Header />
              <SignInSection />
              <div>
                {children}
                <Footer />

                <ToastContainer />
              </div>
            </NextAuthProvider>
          </SplashScreenProvider>
        </ReduxToolkitProvider>
      </body>
    </html>
  );
}
