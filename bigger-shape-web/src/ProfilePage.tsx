import React, { useEffect } from "react";
import CardContainer from "./CardContainer";

const ProfilePage = () => {
  //   If user is not yet logged in, redirect them to login page
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  const numberOfSubmissions = 5;
  //https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fagentestudio.com%2Fuploads%2Fckeditor%2Fpictures%2F1568%2Fcontent_user-profile-design-15.jpg&f=1&nofb=1&ipt=b1360a8ec1330fbb2ae041ed7258c86141981fd4d71dfd87db8598d39f8eecaa
  const cards = [];
  for (let i = 1; i <= numberOfSubmissions; i++) {
    cards.push(
      <CardContainer
        width={5}
        height={5}
        fromColor="gray-100"
        toColor="gray-100"
        className="flex flex-row space-x-4 pt-2 
            hover:shadow-md hover:scale-110 transition-all duration-300"
      >
        <p>{`Questionnaire Submission #${i}`}</p>
      </CardContainer>
    );
  }

  return (
    <>
      <div className="fixed bg-gradient-to-br from-blue-800 to-blue-900 top-0 left-0 w-full h-full object-cover -z-10"></div>
      <CardContainer
        width={5}
        height={5}
        fromColor="gray-100"
        toColor="gray-100"
        className="flex flex-row space-x-4"
      >
        <CardContainer
          width={5}
          height={5}
          fromColor="blue-200"
          toColor="blue-500"
          className="flex-col"
        >
          <img
            id="profile"
            src="/default-pfp.jpg"
            alt="profile picture"
            className="overflow-hidden rounded-full"
          ></img>
          <p>Welcome John Smith</p>
          <p>Email: jsmith@sample.com</p>
        </CardContainer>
        <CardContainer
          width={5}
          height={5}
          fromColor="blue-200"
          toColor="blue-500"
          className="flex-col overflow-y-auto max-h-96 overscroll-contain flex-grow"
        >
          {cards}
        </CardContainer>
      </CardContainer>
    </>
  );
};

export default ProfilePage;
