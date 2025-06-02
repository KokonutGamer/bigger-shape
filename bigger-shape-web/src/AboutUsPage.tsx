import NavBar from "./components/NavBar";
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

                <h1>About Us</h1>

                <div className="border-4 border-blue-500 w-[80vw] h-[60vh] rounded-lg p-[2vh] flex justify-center items-center flex-col mt-[8vh]">
                    <p className="text-2xl font-bold text-black">
                        The purpose of this website is to use the skills we have developed in our <a href="https://www.uwb.edu/stem/undergraduate/majors/bscsse">CSSE</a> program
                        to try and provide resouces for homeless people in the Seattle area.

                    </p>
                </div>

            </div>
        </>
    );
}

export default AboutUsPage;