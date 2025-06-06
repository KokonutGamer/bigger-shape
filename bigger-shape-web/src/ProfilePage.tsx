import React, { useEffect, useState } from "react";
import CardContainer from "./CardContainer";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import HistoryModal from "./HistoryModal";
import { useAuth } from "./AuthContext";
import { supabase } from "./AuthContext";
import { useSurveySubmit } from "./useSurveySubmit";

const ProfilePage = () => {
  // Used to redirect the user to another page
  const navigate = useNavigate();
  const auth = useAuth();
  const { handleSubmit: handleSurveySubmit } = useSurveySubmit();

  useEffect(() => {
    loadCorrectProfile();
  }, []);

  useEffect(() => {
    const isUploaded = localStorage.getItem("uploaded");
    if (isUploaded === "false" && auth?.session) {
      handleSurveySubmit();
      localStorage.setItem("uploaded", "true");
    }
  }, [auth?.session, handleSurveySubmit]);

  const [numberOfSubmissions, setNumberOfSubmissions] = useState(3);
  // Query the questionnaire submissions related to each specific account
  // Each submission has their own ID, which can be stored as a URL parameter (11.10)

  // Used to control the visiblity of the previous submissions modal
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  // Dynamic list of homeless resources
  const [resources, setResources] = useState<React.ReactNode[]>([]);

  // An array of cards that appear on the submissions modal
  const previousSubmissions = renderSubmissions(numberOfSubmissions);

  useEffect(() => {
    document.title = "Dashboard";
    import("bootstrap/dist/css/bootstrap.min.css");
    loadResources();
  }, []);

  // Redirects the user to the survey page
  const handleTakeQuestionnaire = () => {
    navigate("/survey");
  };

  // Logs the user out of their account and redirects the user
  // to the login page
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      // error handling
    } else {
      sessionStorage.clear();
      localStorage.setItem("uploaded", "false");
      navigate("/login");
    }
  };

  // Closes the history modal
  function hideHistory() {
    setIsHistoryVisible(false);
  }

  // Returns the profile page component depending on whether
  // or not the user is authenticated or not
  const loadCorrectProfile = () => {
    if (!auth?.isLoading && !auth?.session) {
      // display default profile card
      return getProfileCard(
        "Guest",
        "Sign In",
        () => navigate("/login"),
        "/default-pfp.jpg"
      );
    } else {
      // display actual profile card
      let displayName = "User";
      if (auth.session?.user.user_metadata.full_name) {
        displayName = auth.session.user.user_metadata.full_name;
      }
      let profilePicture = "/default-pfp.jpg";
      if (auth.session?.user.user_metadata.avatar_url) {
        profilePicture = auth.session.user.user_metadata.avatar_url;
      }
      let email;
      if (auth.session?.user.user_metadata.email) {
        email = auth.session.user.user_metadata.email;
      }
      return getProfileCard(
        displayName,
        "Get Previous Submissions",
        () => setIsHistoryVisible(true),
        profilePicture,
        email
      );
    }
  };

  // Initializes the profile card containing a user's name, email,
  // and profile picture
  const getProfileCard = (
    name: string,
    secondButtonText: string,
    onClick: () => void,
    profilePicture: string,
    email?: string
  ) => {
    return (
      <CardContainer
        width={5}
        height={5}
        fromColor="blue-200"
        toColor="blue-500"
        className="flex-col"
      >
        <img
          id="profile"
          src={profilePicture}
          alt="profile picture"
          className="overflow-hidden rounded-full"
          referrerPolicy="no-referrer"
        ></img>
        <p>Welcome {name}</p>
        {email && <p>Email: {email}</p>}
        <Button
          type="button"
          color="green"
          text="Take Questionnaire"
          onClick={handleTakeQuestionnaire}
        ></Button>
        <Button
          type="button"
          color="blue"
          text={secondButtonText}
          onClick={onClick}
        ></Button>
        {auth?.session && (
          <Button
            type="button"
            color="red"
            text="Sign out"
            onClick={handleSignOut}
          ></Button>
        )}
      </CardContainer>
    );
  };

  // Loads all the recommendation cards from sessionStorage
  const loadResources = () => {
    setResources([]);
    const recommendationsString = sessionStorage.getItem("recommendations");
    if (!recommendationsString) {
      return;
    }
    const recommendations = JSON.parse(recommendationsString).recommendations;
    if (recommendations.length === 0) {
      return;
    }
    // Traverse through the fetched JSON and create a card for each resource
    const resourceCards = [];
    for (let i = 0; i < recommendations.length; i++) {
      resourceCards.push(
        <CardContainer
          key={`resources${i}`}
          width={5}
          height={5}
          fromColor="gray-100"
          toColor="gray-100"
          className="flex-col max-w-md"
        >
          <p className="font-bold text-lg">{recommendations[i].name}</p>
          <p>{recommendations[i].description}</p>
          <span className="flex flex-row justify-center space-x-10">
            <Button
              type="button"
              color="red"
              text="Contact Now"
              onClick={() =>
                window.open(recommendations[i].contactUrl, "_blank")
              }
            ></Button>
            <Button
              type="button"
              color="red"
              text="Learn More"
              onClick={() =>
                window.open(recommendations[i].websiteUrl, "_blank")
              }
            ></Button>
          </span>
        </CardContainer>
      );
    }
    setResources(resourceCards);
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
        {loadCorrectProfile()}
        <CardContainer
          width={5}
          height={5}
          fromColor="blue-200"
          toColor="blue-500"
          className="flex-col justify-evenly overflow-y-auto max-h-96 overscroll-contain flex-grow"
        >
          {resources.length === 0 ? (
            <>
              <p className="font-bold text-lg">No recommendations found</p>
              <p>Fill out a survey to get recommendations!</p>
            </>
          ) : (
            <>
              <p className="text-xl font-bold">Survey Results</p>
              <p className="text-lg">Risk Level: 1/10 </p>
              {resources}
            </>
          )}
        </CardContainer>
      </CardContainer>
      <HistoryModal
        show={isHistoryVisible}
        hide={hideHistory}
        submissions={previousSubmissions}
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
