import NavBar from "./components/NavBar";
import TeamMember from "./components/TeamMember";
/**
 * A functional component that renders the About Us page.
 *
 * The About Us page renders a title, a description of the website,
 * and a list of team members with links to their GitHub and LinkedIn profiles.
 *
 * @returns {ReactElement} The rendered AboutUsPage component.
 */
function AboutUsPage() {
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

                    #root{
                        padding: 0;
                        margin: 0;
                    }
                `
                }
            </style>
            <div className="flex flex-col items-center justify-center h-[10vh] w-[100vw]">
                <NavBar />
            </div>
            <div className="flex flex-col items-center justify-center h-[90vh] w-[100vw]">

                <h1 className="text-5xl font-bold text-center mt-[5vh] text-black">About Us</h1>
                <div className="flex flex items-center justify-around h-[90vh] w-[100vw]">


                    <div className="bg-gradient-to-br from-blue-500 to-blue-200 w-[40vw] h-[60vh] rounded-lg p-[2vh] flex justify-center items-center flex-col">
                        <p className="text-2xl font-bold text-white">
                            The purpose of this website is to use the skills we have developed in our <a href="https://www.uwb.edu/stem/undergraduate/majors/bscsse" className="text-blue-500 hover:underline hover:text-blue-700">CSSE</a> program
                            to try and provide resources for homeless people in the Seattle area.
                        </p>

                        <p className="text-2xl font-bold text-white mt-[2vh]">
                            The goal is to create a tool that is easy for people with varying technical
                            skills to use to find resources for their needs.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-200 text-white w-[40vw] h-[60vh] rounded-lg p-[2vh] flex justify-center items-center flex-col">
                        <p className="text-2xl font-bold text-white italic">The Team</p>
                        {/* team members displayed using TeamMember component */}
                        <TeamMember name="Alan Cordova" github="https://github.com/YoloMcFroyo" linkedin="https://www.linkedin.com/in/alan-talcor/" />
                        <TeamMember name="David Phillips" github="https://github.com/orionsView" linkedin="https://www.linkedin.com/in/david-phillips-swe/" />
                        <TeamMember name="Gabe Lapingcao" github="https://github.com/KokonutGamer" linkedin="https://www.linkedin.com/in/gabe-lapingcao/" />
                        <TeamMember name="Kent Mayoya" github="https://github.com/KentMayoya" linkedin="https://www.linkedin.com/in/kent-mayoya/" />

                    </div>
                </div>

            </div >
        </>
    );
}

export default AboutUsPage;