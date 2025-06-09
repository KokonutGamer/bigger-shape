import NavBar from "./components/NavBar";
/**
 * A functional component that renders a home page with a navigation bar
 * at the top, a welcome message, and a short description of the purpose
 * of the site. 
 *
 * @returns A JSX element representing the home page.
 */
function HomePage() {
    return (
        <>
            <style>
                {/* to fix issue dealing with vite */}
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

            <div className="flex items-center justify-center flex-col w-[100vw] h-[10vh]">
                <NavBar />
            </div>

            <div className="flex flex-col items-center justify-center w-[100vw] h-[90vh]">
                <p className="text-5xl font-bold text-center mt-[10vh] text-black">Welcome to SHAPE</p>

                <p className="text-center mt-[1vh] mb-[5vh] text-black">Seattle Homeless Aid & Prevention Effort
                </p>
                <div className="flex items-center justify-around w-full flex-wrap gap-4">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-200 text-white w-[40vw] h-[60vh] rounded-lg p-[2vh] flex justify-center items-center flex-col">
                        <p className="text-left mt-[1vh] text-black text-[clamp(0.75rem,1.5vw,1.5rem)]">
                            Over <strong>16,000</strong> Seattle individuals experienced
                            homelessness in 2024. This figure has increased compared to 2022. Our site aims to act as an early warning sign for individuals who may be
                            at risk in the future, as well as providing resources for those
                            currently at risk. The process is simple:
                        </p>
                        <div className="flex items-center justify-between mt-[2vh] w-[100%] h-[60%]">
                            <div className="w-[25%] h-[40%]">
                                <a href="/signup">
                                    <img src="/blackProfileLogo.svg" alt="Create Account Photo" className="w-[100%] h-[100%] rounded-lg color-white" />

                                </a>
                                <p className="text-center mt-[1vh] text-black">Create An Account</p>
                            </div>
                            <div className="w-[25%] h-[50%]">
                                <a href="/survey">
                                    <img src="/surveyLogo.svg" alt="Survey Logo" className="w-[100%] h-[100%] rounded-lg color-white" />
                                </a>
                                <p className="text-center mt-[1vh] text-black">Take The Survey</p>
                            </div>
                            <div className="w-[25%] h-[40%]">
                                <a href="/dashboard">
                                    <img src="/handsHelpingLogo.svg" alt="Help Logo" className="w-[100%] h-[100%] rounded-lg color-white" />
                                </a>
                                <p className="text-center mt-[1vh] text-black">Get The Help You Need</p>
                            </div>

                        </div>
                    </div>

                    <div className="w-[40vw] h-[60vh]  border-4 border-blue-500  rounded-lg p-[2vh] overflow-hidden flex justify-center items-center flex-col">
                        <img src="/homeless-census-visual.jpg" alt="Homeless Causes" className="max-w-full max-h-full object-contain" />
                    </div>



                </div>
            </div >

        </>
    );
}

export default HomePage