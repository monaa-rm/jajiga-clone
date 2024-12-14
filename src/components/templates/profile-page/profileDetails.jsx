import EditElement from "./editElement";
import PasswordElement from "./passwordElement";

const ProfileDetails = ({ user }) => {
  return (
    <div className="flex flex-col gap-3 pt-[100px] w-full pb-12 px-3  md:pr-8 lg:pr-4 md:max-w-[600px]  ">
      <EditElement
        itemtype={"name"}
        title="نام"
        content={user.name}
        userId={user._id}
      />
      <EditElement
        itemtype={"lastName"}
        title="نام خانوادگی"
        content={user.lastName}
        userId={user._id}
      />
      <EditElement
        itemtype={"phone"}
        title="شماره همراه"
        content={user.phone}
        userId={user._id}
      />
      <PasswordElement userId={user._id} />
    </div>
  );
};

export default ProfileDetails;
