import React, { useEffect, useState } from "react";
import CardContainer from "./CardContainer";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import HistoryModal from "./HistoryModal";
import { useAuth } from "./AuthContext";
import { supabase } from "./AuthContext";
import { getRecommendations, getQuestions } from "./useSurveySubmit";

const ProfilePage = () => {
  // Used to redirect the user to another page
  const navigate = useNavigate();
  const auth = useAuth();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Used to control the visiblity of the previous submissions modal
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  // Dynamic list of homeless resources
  const [resources, setResources] = useState<React.ReactNode[]>([]);

  const [resourcesLoading, setResourcesLoading] = useState(false);

  // Value used to determine which submission recommendations to render
  const [selectedSubmission, setSelectedSubmission] = useState<number>(0);

  // Changes the tab's title, applies styles, and loads recommendations.
  useEffect(() => {
    document.title = "Dashboard";
    import("bootstrap/dist/css/bootstrap.min.css");
  }, []);

  // Renders the page upon landing on the dashboard
  useEffect(() => {
    const processHistory = async () => {
      await loadHistory();
      loadQuestions();
      getRecommendations();
      loadResources();
      renderSubmissions();
    };
    if (auth?.isLoading) {
      return;
    }
    if (!auth?.session) {
      processHistory();
      localStorage.setItem("uploaded", "false");
      return;
    }
    loadCorrectProfile();
    processHistory();
  }, [auth?.isLoading]);

  // Loads user's history and stores in session storage
  const loadHistory = async () => {
    if (auth?.session?.access_token) {
      // If the user is authorized, GET their history.
      const response = await fetch(
        `${API_BASE_URL}/api/v1/auth/users/history`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.session.access_token}`,
          },
        }
      );
      if (response.ok) {
        const body = await response.json();
        sessionStorage.setItem("history", JSON.stringify(body));
      }
    }
  };

  useEffect(() => {
    const processHistory = async () => {
      setResourcesLoading(true);
      await loadHistory();
      const questionsLoaded = await loadQuestions();
      if (questionsLoaded) {
        await getRecommendations();
        loadResources();
      }
      setResourcesLoading(false);
    };
    processHistory();
  }, [selectedSubmission]);

  // Loads questions into session storage
  // The questions are needed to create the recommendations
  const loadQuestions = async () => {
    console.log("loading questions");
    const body = JSON.parse(sessionStorage.getItem("history"));
    if (!body || body.length === 0) {
      return false;
    }
    console.log(body);
    const answers = body[selectedSubmission].answers;
    // Retrieve the question ids
    getQuestions().then((ids) => {
      for (let i = 0; i < ids.length; i++) {
        sessionStorage.setItem(
          `question-${i}`,
          JSON.stringify({
            questionId: ids[i],
            answerIndex: answers[i].questionOptionOrder,
          })
        );
      }
    });
    return true;
  };

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
      //   localStorage.setItem("uploaded", "false");
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
  // Used for public recommendations i.e. when the user is not logged in
  const loadResources = () => {
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
              onClick={() => {
                window.open(recommendations[i].contactUrl, "_blank");
                return;
              }}
            ></Button>
            <Button
              type="button"
              color="red"
              text="Learn More"
              onClick={() => {
                window.open(recommendations[i].websiteUrl, "_blank");
                return;
              }}
            ></Button>
          </span>
        </CardContainer>
      );
    }
    setResources(resourceCards);
  };

  // Renders the cards that appear when clicking on the "Get Previous Submissions" button
  const renderSubmissions = () => {
    const cards = [];
    let userHistory = sessionStorage.getItem("history");
    if (!userHistory) {
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
      userHistory = JSON.parse(userHistory);
      if (Array.isArray(userHistory)) {
        for (let i = 0; i < userHistory.length; i++) {
          cards.push(
            <CardContainer
              width={5}
              height={5}
              fromColor="gray-100"
              toColor="gray-100"
              className="flex flex-col justify-center text-center border border-black
              hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer"
              key={i}
              onClick={() => {
                setSelectedSubmission(i);
                setIsHistoryVisible(false);
              }}
            >
              <p>{`Questionnaire Submission #${i + 1}`}</p>
              <p>{`Date taken: ${new Date(
                userHistory[i].questionnaire.dateTaken
              ).toLocaleString()}`}</p>
            </CardContainer>
          );
        }
      }
    }
    return cards;
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
          className="p-6 overflow-y-auto max-h-96 overscroll-contain flex-grow"
        >
          {resourcesLoading ? (
            <div className="flex justify-center items-center h-full">
              <p className="font-bold">Loading recommendations...</p>
            </div>
          ) : resources.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-full text-center">
              <p className="font-bold text-lg">No Survey Selected</p>
            </div>
          ) : (
            <div className="flex flex-col space-y-4">
              <div className="text-center">
                <p className="text-xl font-bold">{`Survey Results #${
                  selectedSubmission + 1
                }`}</p>
                <p className="max-w-md">{`${sessionStorage.getItem(
                  "message"
                )}`}</p>
                <p className="text-lg font-bold">{`Risk Level: ${sessionStorage.getItem(
                  "riskScore"
                )}/10`}</p>
              </div>
              {resources}
            </div>
          )}
        </CardContainer>
      </CardContainer>
      <HistoryModal
        show={isHistoryVisible}
        hide={hideHistory}
        submissions={renderSubmissions()}
      ></HistoryModal>
    </>
  );
};

export default ProfilePage;
