import Survey from "./components/Survey";
import NavBar from "./components/NavBar";

const SurveyPage = () => {
    return (
        <>
            <div className="bg-gradient-to-br from-blue-200 to-blue-500 w-[100vw] ">
                <div className="flex items-center  flex-col w-[100vw] h-[10vh]">
                    <NavBar />
                </div>
                <div className="flex items-center flex-col w-[100vw]  ">
                    <Survey />
                </div>
            </div>
        </>

    );
};

export default SurveyPage;