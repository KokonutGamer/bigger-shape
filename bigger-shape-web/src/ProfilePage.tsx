import { useEffect } from "react";

const ProfilePage = () => {
  //   If user is not yet logged in, redirect them to login page
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  // Things to make it look better
  // interactive hovers or on focus for textboxes
  // Custom error visuals
  //https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fagentestudio.com%2Fuploads%2Fckeditor%2Fpictures%2F1568%2Fcontent_user-profile-design-15.jpg&f=1&nofb=1&ipt=b1360a8ec1330fbb2ae041ed7258c86141981fd4d71dfd87db8598d39f8eecaa
  return (
    <>
      <Card />
      <Card />
      <Card />
    </>
  );
};

interface CardProps {}

const Card: React.FC<CardProps> = ({}) => {
  return <h1>Test</h1>;
};

export default ProfilePage;
