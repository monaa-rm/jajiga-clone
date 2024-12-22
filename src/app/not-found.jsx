import NotFoundPage from "@/components/notfoundpage";
import React from "react";


export async function generateMetadata({ }) {
  return {
     title:`صفحه یافت نشد`,
     description:`صفحه یافت نشد`,
     robots: {
        index: false,
        follow: false,
        nocache: true,
     },
  };
}

const NotFound = () => {
  return <NotFoundPage />;
};

export default NotFound;
