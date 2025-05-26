import React, { useEffect, useState } from "react";
import CardContainer from "./CardContainer";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import HistoryModal from "./HistoryModal";

const ProfilePage = () => {
  // If user is not yet logged in, redirect them to login page
  // If the user has not yet submitted a questionnaire, redirect them to the
  // survey page. To view the dashboard, they must have at least one submission.
  // Hmm... are we allowing the user to delete previous submissions?
  const navigate = useNavigate();
  const [numberOfSubmissions, setNumberOfSubmissions] = useState(3);
  // Query the questionnaire submissions related to each specific account
  // Each submission has their own ID, which can be stored as a URL parameter (11.10)
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const cards = renderSubmissions(numberOfSubmissions);

  useEffect(() => {
    document.title = "Dashboard";
    import("bootstrap/dist/css/bootstrap.min.css");
  }, []);

  const handleTakeQuestionnaire = () => {
    navigate("/survey");
  };

  function showHistory() {
    setIsHistoryVisible(true);
  }

  function hideHistory() {
    setIsHistoryVisible(false);
  }

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
          <Button
            type="button"
            color="blue"
            text="See Previous Submissions"
            onClick={() => setIsHistoryVisible(true)}
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
      <HistoryModal
        show={isHistoryVisible}
        hide={hideHistory}
        submissions={cards}
      ></HistoryModal>
    </>
  );
};

// This just accepts an integer parameter for now. Later this should
// probably be changed to accept an array of Ids which correlate
// to a unique questionnaire submission
const renderSubmissions = (numberOfSubmissions: number) => {
  const cards = [];
  if (numberOfSubmissions === 0) {
    cards.push(
      <CardContainer
        width={5}
        height={5}
        fromColor="blue-200"
        toColor="blue-500"
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
            hover:shadow-md hover:scale-105 transition-all duration-300"
        >
          <p>{`Questionnaire Submission #${i}`}</p>
        </CardContainer>
      );
    }
  }
  return cards;
};

export default ProfilePage;
