import FavoritesPage from "@/components/templates/favoritesPage";

export async function generateMetadata({ }) {
  const siteURL = 'http://localhost:3000';
  return {
     title:`علاقه مندی ها`,
     description:`علاقه مندی ها`,
     alternates: {
        canonical: `${siteURL}/favorites`,
     },
     robots: {
        index: false,
        follow: false,
        nocache: true,
     },
  };
}

const Favorits = async () => {
 

  return <FavoritesPage />;
};

export default Favorits;
