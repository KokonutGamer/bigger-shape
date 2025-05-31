import React, { useEffect, useState } from "react";
import CardContainer from "./CardContainer";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import HistoryModal from "./HistoryModal";
import { useAuth } from "./AuthContext";
import { supabase } from "./AuthContext";

const ProfilePage = () => {
  // Used to redirect the user to another page
  const navigate = useNavigate();
  const auth = useAuth();

  // If user is not yet logged in, redirect them to login page
  useEffect(() => {
    loadCorrectProfile();
  }, []);

  // If the user has not yet submitted a questionnaire, redirect them to the
  // survey page. To view the dashboard, they must have at least one submission.
  // Hmm... are we allowing the user to delete previous submissions?

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
      console.log(`Profile picture: ${profilePicture}`);
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

  // Probably have a fetch here that will get all the resources
  const loadResources = () => {
    setResources([]);
    const hardCodedResources = [
      {
        name: "Homeless shelter program",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.",
        contact: "somelink.com",
        info: "somelink.com",
      },
      {
        name: "Homeless shelter program2",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.",
        contact: "somelink2.com",
        info: "somelink2.com",
      },
    ];

    // Traverse through the fetched JSON and create a card for each resource
    const resourceCards = [];
    for (let i = 0; i < hardCodedResources.length; i++) {
      resourceCards.push(
        <CardContainer
          key={`resources${i}`}
          width={5}
          height={5}
          fromColor="gray-100"
          toColor="gray-100"
          className="flex-col max-w-md"
        >
          <p className="font-bold text-lg">{hardCodedResources[i].name}</p>
          <p>{hardCodedResources[i].description}</p>
          <span className="flex flex-row justify-center space-x-10">
            <Button
              type="button"
              color="red"
              text="Contact Now"
              onClick={() =>
                window.open(hardCodedResources[i].contact, "_blank")
              }
            ></Button>
            <Button
              type="button"
              color="red"
              text="Learn More"
              onClick={() => window.open(hardCodedResources[i].info, "_blank")}
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
          {/* So I'm trying to figure out to relate survey risk with the resources
          since they're two different tables.
          */}
          <p className="text-xl font-bold">Survey Results</p>
          <p className="text-lg">Risk Level: 1/10 </p>
          {resources}
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
