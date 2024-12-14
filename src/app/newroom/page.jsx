import NewRoomPage from '@/components/templates/newroompage'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation';

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
