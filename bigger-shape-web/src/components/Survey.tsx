import { useState, useEffect } from "react";
import InputField from "./InputField";
import ProgressBar from "./ProgressBar";
import { useAuth } from "../AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Define a type for a question object
type Question = {
  type: string;
  id: string;
  label: string;
  options: string[];
};

function Survey() {
  const auth = useAuth();
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/public/questions')
      .then(res => res.json())
      .then(data => {
        console.log("Fetched data:", data);  // This should log your JSON object
        setQuestions(data.questions);
        setSelectedAnswer(Array(data.questions.length).fill("default"));
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  if (!questions) {
    return <h1>Loading...</h1>;
  }

  function decrePage() {
    setPage((curPage) => (curPage > 0 ? curPage - 1 : curPage));
  }

  function increPage() {
    setPage((curPage) =>
      questions && curPage < questions.length ? curPage + 1 : curPage
    );
  }

  // Returns the body of the HTTPRequest in a JSON format
  const getBody = () => {
    const submissionAnswers: {
      answerContent: string;
      questionOrder: number;
    }[] = [];
    console.log("Printing out what's in session storage:");

    const rawResponse = sessionStorage.getItem("response") || "[]";
    const answersArray = JSON.parse(rawResponse);

    console.log("Done printing!");
    for (let i = 0; i < answersArray.length; i++) {
      const answer: string = answersArray[i];
      submissionAnswers.push({
        answerContent: answer,
        questionOrder: i + 1,
      });
    }

    return JSON.stringify({
      questionnaire: {
        dateTaken: new Date().toISOString(),
        riskScore: 5,
      },
      answers: submissionAnswers,
    });
  };

  function handleSubmit() {
    console.log(`selected answer:${selectedAnswer}`);
    sessionStorage.setItem("response", JSON.stringify(selectedAnswer));
    if (auth?.session?.access_token) {
      console.log("User is authenticated! Sending API Request");
      console.log("Request body: " + getBody());
      fetch(`${API_BASE_URL}/api/v1/auth/users/history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.session.access_token}`,
        },
        body: getBody(),
      })
        .then((_data) => (window.location.href = "/dashboard"))
        .catch((error) => console.error("Error:", error));
    } else {
      console.log("User is not authenticated!");
    }
  }

  return (
    <>
      <style>
        {`
                #root{
                  padding: 0;
                  margin: 0;
                }
                body {
                    background-image: linear-gradient(to top left, #bfdbfe, #3b82f6);
                }    
                `}
      </style>

      <div
        className="w-[90vh] h-[50vh] flex flex-col p-[5vh] bg-gradient-to-br from-blue-200 to-blue-500
            rounded-lg
            text-black
            shadow-md
           justify-center
            "
      >
        {/* <h1 className="text-center text-3xl font-bold mb-4">{pages[page].title}</h1> */}
        <ProgressBar percent={(page / questions.length) * 100} />
        {page === questions.length ? (
          <div className="flex items-center justify-center h-[50%]">
            <h1 className="text-center text-3xl font-bold mb-4 text-white">
              Survey Completed!
            </h1>
          </div>
        ) : (
          <div className="flex flex-col justify-center h-[50%]">
            <InputField
              type={questions[page]["type"]}
              id={questions[page]["id"]}
              label={questions[page]["label"]}
              options={questions[page]["options"]}
              currentValue={selectedAnswer[page]}
              setCurrentValue={(value: string) => {
                setSelectedAnswer((prev) => {
                  const updated = [...prev];
                  updated[page] = value;
                  return updated;
                });
              }}
            />
          </div>
        )}
        <div className="flex space-x-4 justify-center mb-4 h-[10%]">
          <p className="text-white" hidden={selectedAnswer[page] !== "default"}>
            Select an option to continue
          </p>
        </div>

        <div className="flex space-x-4 justify-center">
          <button
            onClick={decrePage}
            className="px-4 py-2 bg-gradient-to-br from-blue-500 to-blue-200 text-white "
            hidden={page === 0}
          >
            Prev
          </button>
          <button
            onClick={increPage}
            className="px-4 py-2 bg-gradient-to-br from-blue-500 to-blue-200 text-white "
            hidden={
              page === questions.length || selectedAnswer[page] === "default"
            }
          >
            Next
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-gradient-to-br from-blue-500 to-blue-200 text-white "
            hidden={page !== questions.length}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default Survey;
