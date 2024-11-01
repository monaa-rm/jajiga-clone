import Link from "next/link"
import { FaChevronLeft } from "react-icons/fa6"

const SingleRoomBreadCrumb = ({city, province}) => {
  return (
    <div className="flex justify-start font-[vazirregular] items-center gap-1 text-sm text-gray-600">
      <Link href={"/"} className="">جاجیگا</Link>
      <FaChevronLeft className="text-gray-800" />
      <Link href={`/s?province=${province.id}`} >{province.name}</Link>
      <FaChevronLeft className="text-gray-800" />
      <Link href={`/s?city=${city.id}`} className="font-bold" >{city.name}</Link>

    </div>
  )
}

export default SingleRoomBreadCrumb
