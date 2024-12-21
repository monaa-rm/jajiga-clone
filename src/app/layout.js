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

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="ltr">
      <body className="relative ">
        <ReduxToolkitProvider>
          <SplashScreenProvider>
            <NextAuthProvider>
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
