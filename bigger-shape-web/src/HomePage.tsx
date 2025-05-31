import NavBar from "./components/NavBar";
function HomePage() {
    const boxStyle = 'border-4 border-blue-500 w-[40vw] h-[60vh] rounded-lg p-[2vh] flex justify-center items-center flex-col ';
    return (
        <>
            <style>
                {
                    `
                    body {
                        background-color: #bfdbfe;
                        height: 100vh;
                        width: 100vw;
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
                <NavBar />
                <p className="text-5xl font-bold text-center mt-[10vh] text-black">Welcome to SHAPE</p>
                <p className="text-center mt-[1vh] mb-[5vh] text-black">Seattle Homeless Aid & Prevention Effort
                </p>
                <div className="flex items-center justify-around w-full mt-[5vh] flex-wrap gap-4">
                    <div className={boxStyle}>
                        <p className="text-left mt-[1vh] text-black text-[clamp(0.75rem,1.5vw,1.5rem)]">
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
                    {/* <div className={`${boxStyle} overflow-hidden`}>
                        <a href="https://www.seattletimes.com/seattle-news/homeless/why-are-people-in-seattle-homeless/">
                            <img
                                src="/homeless-census-visual.jpg"
                                alt="Homeless Causes"
                                className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
                            />
                        </a>
                    </div> */}
                    <div className="w-[40vw] h-[60vh] max-w-md  border-4 border-blue-500  rounded-lg p-[2vh] overflow-hidden flex justify-center items-center flex-col">
                        <img src="/homeless-census-visual.jpg" alt="Example" className="max-w-full max-h-full object-contain" />
                    </div>



                </div>
            </div>

        </>
    );
}

export default HomePage