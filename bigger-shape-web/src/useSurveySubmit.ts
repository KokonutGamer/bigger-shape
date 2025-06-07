import { useAuth } from "./AuthContext";

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
            riskScore: 5,
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

// pushes survey answers to the database if the user is authorized
export function useSurveySubmit() {
    const auth = useAuth();
    const handleSubmit = () => {
        if (auth?.session?.access_token) {
            fetch(`${API_BASE_URL}/api/v1/auth/users/history`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.session.access_token}`,
                },
                body: getHistoryRequestBody(),
            })
                .then(() => {
                    // prevents duplicate submissions
                    localStorage.setItem("uploaded", "true");
                })
                .catch((error) => {
                    console.error("Error:", error)
                }
            );
        }
        // get recommendations
        fetch(`${API_BASE_URL}/api/v1/public/submit-answers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: getRecommendationsRequestBody(),
        })
            .then((response) => response.json())
            .then((body) => {
                sessionStorage.setItem("recommendations", JSON.stringify(body));
            })
            .then(() => (window.location.href = "/dashboard")
        );
    }
    return { handleSubmit };
}
