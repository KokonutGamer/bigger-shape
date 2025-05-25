import React, { useEffect, useState } from "react";
import CardContainer from "./CardContainer";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [numberOfSubmissions, setNumberOfSubmissions] = useState(3);
  //   If user is not yet logged in, redirect them to login page
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  const cards = [];
  if (numberOfSubmissions === 0) {
    cards.push(
      <CardContainer
        width={5}
        height={5}
        fromColor="gray-100"
        toColor="gray-100"
        className="flex flex-row space-x-4"
      >
        <p>No submissions yet!</p>
      </CardContainer>
    );
  } else {
    for (let i = 1; i <= numberOfSubmissions; i++) {
      cards.push(
        <CardContainer
          width={5}
          height={5}
          fromColor="gray-100"
          toColor="gray-100"
          className="flex flex-row space-x-4
            hover:shadow-md hover:scale-110 transition-all duration-300"
        >
          <p>{`Questionnaire Submission #${i}`}</p>
        </CardContainer>
      );
    }
  }

  const handleTakeQuestionnaire = () => {
    navigate("/survey");
  };

  return (
    <>
      <div
        className="fixed 
            bg-gradient-to-br from-blue-100 to-blue-200
            top-0 left-0 w-full h-full object-cover -z-10"
      ></div>
      <CardContainer
        width={5}
        height={5}
        fromColor="gray-100"
        toColor="gray-100"
        className="space-x-4"
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
          <Button
            type="button"
            color="green"
            text="Take Questionnaire"
            onClick={handleTakeQuestionnaire}
          ></Button>
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
