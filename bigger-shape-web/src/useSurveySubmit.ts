import { useAuth } from "./AuthContext";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Returns the body of the HTTPRequest for /api/v1/auth/users/history in a JSON format
const getHistoryRequestBody = () => {
    const submissionAnswers: {
        answerContent: string;
        questionOrder: number;
    }[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
        const value = sessionStorage.getItem(`question-${i}`);
        if (!value) {
            continue;
        }
        const answerData = JSON.parse(value);
        submissionAnswers.push({
            answerContent: answerData.answerValue,
            questionOrder: i + 1,
        });
    }
    return JSON.stringify({
        questionnaire: {
            dateTaken: new Date().toISOString(),
            riskScore: sessionStorage.getItem("riskScore"),
        },
        answers: submissionAnswers,
    });
};

// Returns the body of the HTTPRequest for /api/v1/auth/users/history in a JSON format
const getRecommendationsRequestBody = () => {
    const submissionAnswers: {
        questionId: string;
        answer: number;
    }[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
        const value = sessionStorage.getItem(`question-${i}`);
        if (!value) {
            continue;
        }
        const answerData = JSON.parse(value);
        submissionAnswers.push({
            questionId: answerData.questionId,
            answer: answerData.answerIndex,
        });
    }
    return JSON.stringify({
        answers: submissionAnswers,
    });
};

// Pushes survey answers to the database if the user is authorized
export function useSurveySubmit() {
    const auth = useAuth();
      const navigate = useNavigate();
    const handleSubmit = useCallback(() => {
        if (auth?.session?.access_token) {
            fetch(`${API_BASE_URL}/api/v1/auth/users/history`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.session.access_token}`,
                },
                body: getHistoryRequestBody(),
            })
                .catch((error) => {
                    throw new Error(error);
                }
            );
        }
        getRecommendations().then(() => {
            navigate("/dashboard");
        });
    }, [auth]);
    return { handleSubmit };
}


// Retrieves the recommendations based on the survey answers
export function getRecommendations() {
    return fetch(`${API_BASE_URL}/api/v1/public/submit-answers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: getRecommendationsRequestBody(),
    })
        .then((response) => response.json())
        .then((body) => {
            sessionStorage.setItem("recommendations", JSON.stringify(body));
            return fetch(`${API_BASE_URL}/api/v1/public/ai/risk-analysis`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: getRecommendationsRequestBody()
            })
            .then((secondResponse) => secondResponse.json())
            .then((secondBody) => {
                const { message, riskScore } = secondBody;
                sessionStorage.setItem("message", message);
                sessionStorage.setItem("riskScore", riskScore);
            })
        }
    );
}

// Returns the questions' id
export function getQuestions() {
    return fetch(`${API_BASE_URL}/api/v1/public/questions`)
      .then((res) => res.json())
      .then((data) =>   {
        return data.questions.map(question => question.id);
      })
      .catch((err) => console.error("Fetch error:", err));
}