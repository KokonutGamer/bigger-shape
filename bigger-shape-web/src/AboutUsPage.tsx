import NavBar from "./components/NavBar";
import TeamMember from "./components/TeamMember";
function AboutUsPage() {
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


                    <div className="border-4 border-blue-500 w-[40vw] h-[60vh] rounded-lg p-[2vh] flex justify-center items-center flex-col">
                        <p className="text-2xl font-bold text-black">
                            The purpose of this website is to use the skills we have developed in our <a href="https://www.uwb.edu/stem/undergraduate/majors/bscsse">CSSE</a> program
                            to try and provide resources for homeless people in the Seattle area.

                        </p>

                        <p className="text-2xl font-bold text-black mt-[2vh]">
                            The goal is to create a tool that is easy for people with varying technical
                            skills to use to find resources for their needs.
                        </p>
                    </div>
                    <div className="border-4 border-blue-500 w-[40vw] h-[60vh] rounded-lg p-[2vh] flex justify-center items-center flex-col">
                        <p className="text-xl font-bold text-black italic">The Team</p>
                        <TeamMember name="David Phillips" github="https://github.com/orionsView" linkedin="https://www.linkedin.com/in/davidphillips7/" />
                        <TeamMember name="Gabe Lapingcao" github="https://github.com/KokonutGamer" linkedin="https://www.linkedin.com/in/davidphillips7/" />
                        <TeamMember name="Kent Mayoya" github="https://github.com/KentMayoya" linkedin="https://www.linkedin.com/in/davidphillips7/" />
                        <TeamMember name="Alan Cordova" github="https://github.com/YoloMcFroyo" linkedin="https://www.linkedin.com/in/davidphillips7/" />

                    </div>
                </div>

            </div >
        </>
    );
}

export default AboutUsPage;