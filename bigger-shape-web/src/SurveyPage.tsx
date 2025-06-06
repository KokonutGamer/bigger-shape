import Survey from "./components/Survey";
import NavBar from "./components/NavBar";

const SurveyPage = () => {
    return (
        <>
            <div className="flex items-center justify-center flex-col w-[100vw] h-[10vh]">
                <NavBar />
            </div>
            <div className="flex items-center justify-center flex-col w-[100vw] h-[90vh]">
                <Survey />
            </div>
        </>

    );
};

export default SurveyPage;