import NewRoomPage from '@/components/templates/newroompage'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation';

export async function generateMetadata({ }) {
  const siteURL = 'http://localhost:3000';
  return {
     title:`ثبت اقامتگاه`,
     description:`ثبت اقامتگاه`,
     alternates: {
        canonical: `${siteURL}/newroom`,
     },
     robots: {
        index: true,
        follow: true,
        nocache: true,
     },
  };
}
const NewRoom = async () => {
  const session = await getServerSession(authOptions);
  if(!session) {
    redirect("/")
  }
  return (
    <div>
      <NewRoomPage />
    </div>
  )
}

export default NewRoom
