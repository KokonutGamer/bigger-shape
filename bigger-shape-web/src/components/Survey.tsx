import { useState, useEffect } from "react";
import InputField from "./InputField";
import ProgressBar from "./ProgressBar";
import { useAuth } from "../AuthContext";
import { useSurveySubmit } from "../useSurveySubmit";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Survey() {
  const auth = useAuth();
  const [questions, setQuestions] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [page, setPage] = useState(0);
  const { handleSubmit } = useSurveySubmit();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/v1/public/questions`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data); // This should log your JSON object
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
    setPage((curPage) => (curPage < questions.length ? curPage + 1 : curPage));
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
              setCurrentValue={(value) => {
                setSelectedAnswer((prev) => {
                  const updated = [...prev];
                  updated[page] = value;
                  const options = questions[page].options;
                  // Get the index of the selected dropdown value
                  const selectedSupabaseIndex = options.indexOf(value) + 1;
                  const answerData = {
                    questionId: questions[page]["id"],
                    answerIndex: selectedSupabaseIndex,
                    answerValue: value,
                    questionOrder: page + 1,
                  };
                  sessionStorage.setItem(
                    `question-${page}`,
                    JSON.stringify(answerData)
                  );
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
