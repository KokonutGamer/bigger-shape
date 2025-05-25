import NavBar from "./components/NavBar";
function HomePage(){
    const boxStyle ='border-4 border-blue-500 w-[40vw] h-[60vh] rounded-lg p-[2vh] flex justify-center items-center flex-col';
    return (
        <>
            <style>
                {
                `
                    body {
                        background-color: #bfdbfe;
                    }
                    * {
                        padding: 0;
                        margin: 0;

                        }
                    #root{
                        padding: 0;
                        margin: 0;
                    }
                `
                }   
            </style>
            <div className="flex flex-col items-center justify-center w-[100vw] h-[100vh]">
                <NavBar/>
                <p className="text-5xl font-bold text-center mt-[10vh] text-black">Welcome to SHAPE</p>
                <p className="text-center mt-[1vh] mb-[5vh] text-black">Seattle Homeless Aid & Prevention Effort
                </p>
                <div className="flex items-center justify-around w-[100%] mt-[5vh]">
                    <div className={boxStyle}>
                        <p className="text-left mt-[1vh] text-black">
                            Over <strong>16,000</strong> Seattle individuals experienced
                            homelessness in 2024. This figure has increased compared to 2022. Our site aims to act as an early warning sign for individuals who may be
                            at risk in the future, as well as providing resources for those
                            currently at risk. The process is simple:
                             {/* addstats */}
                        </p>
                        <div className="flex items-center justify-between mt-[2vh] w-[100%] h-[60%]">
                            <div className="w-[25%] h-[40%]">
                                <img src="/profileLogo.svg" alt="Create Account" className="w-[100%] h-[100%] rounded-lg color-white" />
                                <p className="text-center mt-[1vh] text-black">Create An Account</p>
                            </div>
                            <div className="w-[25%] h-[50%]">
                                <img src="/surveyLogo.svg" alt="Create Account" className="w-[100%] h-[100%] rounded-lg color-white" />
                                <p className="text-center mt-[1vh] text-black">Take The Survey</p>
                            </div>                           
                            <div className="w-[25%] h-[40%]">
                                <img src="/handsHelpingLogo.svg" alt="Create Account" className="w-[100%] h-[100%] rounded-lg color-white" />
                                <p className="text-center mt-[1vh] text-black">Get The Help You Need</p>
                            </div>

                        </div>
                    </div>
                    <div className={boxStyle}>
                        <a href="https://www.seattletimes.com/seattle-news/homeless/why-are-people-in-seattle-homeless/">
                            <img src="/homeless-census-visual.jpg" alt="Homeless Causes" className="h-[100%] rounded-lg" />
                        </a>
                    </div>
                </div></div>

        </>
    );
}

export default HomePage