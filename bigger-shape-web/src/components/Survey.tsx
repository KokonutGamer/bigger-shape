import { useState, useEffect } from "react";
import InputField from "./InputField";
import ProgressBar from "./ProgressBar";
import { useSurveySubmit } from "../useSurveySubmit";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Define a type for a question object
type Question = {
  type: string;
  id: string;
  label: string;
  options: string[];
};

/**
 * A Survey component that fetches questions from the API and renders an
 * InputField component for each question. The user can select an answer
 * for each question and navigate through the survey using the Prev and Next
 * buttons. The Submit button is only visible when the user has answered all
 * the questions, and clicking it will submit the answers to the API.
 *
 * The component uses the useState and useEffect hooks to fetch the questions
 * from the API and store the user's answers in the component's state. The
 * component also uses the useSurveySubmit hook to handle the submission of
 * the answers to the API.
 *
 * @returns {ReactElement} The rendered Survey component.
 */
function Survey() {
  const [questions, setQuestions] = useState<Question[] | null>(null); //questions to be fetched
  const [selectedAnswer, setSelectedAnswer] = useState<string[]>([]); //user answers
  const [page, setPage] = useState(0);
  const { handleSubmit } = useSurveySubmit();
  const numberSelected = selectedAnswer.filter((answer) => answer !== "default").length;
  const allSelected: boolean = (questions && selectedAnswer.every(ans => ans !== "default")) || false;



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
    return (
      <>
        <style>
          {/*fixing issue from using vite*/}
          {`
                #root{
                  padding: 0;
                  margin: 0;
                  // height: 100vh;
                  }

                  `}
        </style>
        <div className="h-[90vh] flex flex-col justify-center">
          <p className="text-center text-6xl font-bold text-white">Loading Questions...</p>;
        </div>
      </>
    );
  }


  return (
    <>
      <style>
        {/*fixing issue from using vite*/}
        {`
                #root{
            padding: 0;
          margin: 0;
                  // height: 200vh;
                  
                }

                // body {
            //      background-image: linear-gradient(to top left, #bfdbfe, #3b82f6);
            // }    
            `}
      </style>

      <div
        className="w-[90vh] flex flex-col p-[5vh] bg-gradient-to-br from-blue-200 to-blue-500
            rounded-lg
            text-black
            shadow-md
           justify-center
           mt-[5vh]
            "
      >
        <ProgressBar percent={(numberSelected / questions.length) * 100} />
        <div className="flex flex-col justify-center">
          {questions.map((question, index) => (
            <InputField
              key={question.id}
              type={question.type}
              id={question.id}
              label={question.label}
              options={question.options}
              currentValue={selectedAnswer[index]}
              setCurrentValue={(value: string) => {
                setSelectedAnswer((prev) => {
                  const updated = [...prev];
                  updated[index] = value;
                  const options = question.options;
                  const selectedSupabaseIndex = options.indexOf(value) + 1;
                  const answerData = {
                    questionId: question.id,
                    answerIndex: selectedSupabaseIndex,
                    answerValue: value,
                    questionOrder: index + 1,
                  };
                  sessionStorage.setItem(
                    `question-${index}`,
                    JSON.stringify(answerData)
                  );
                  return updated;
                });
              }}
            />
          ))}
        </div>
        <div className="flex space-x-4 justify-center mb-4 h-[10%]">
          { /*this message only appears when the user has not selected an option*/}
          <p className="text-white" hidden={allSelected}>
            Please Fill Out All Fields To Continue
          </p>
        </div>

        <div className="flex space-x-4 justify-center">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-gradient-to-br from-blue-500 to-blue-200 text-white "
            hidden={!allSelected}
          >
            Submit
          </button>
        </div>
      </div >
    </>
  );
}

export default Survey;
