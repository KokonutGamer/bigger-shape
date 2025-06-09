/**
 * A functional component that renders a horizontal navigation bar with the SHAPE logo
 * on the left and four links on the right: Survey, About Us, Profile, and Home. The links
 * are styled as buttons with white text and a blue background.
 */
function NavBar() {
    return (
        <>
            <div className="flex items-center justify-between bg-blue-500 h-[10vh] w-[90vw] p-[4vh] rounded-lg">
                <div className="flex flex-row w-[25%] items-center ">
                    <img src="whiteSLogo.svg" alt="SHAPE logo" className=" h-[8vh]" />
                    <p className="text-2xl font-sans text-white font-bold pt-[2vh]">HAPE</p>
                </div>
                <div className="flex items-center justify-between bg-blue-500 h-[8vh] w-[5n0%] rounded-lg">
                    <a href="../Survey"><div className="text-2xl font-bold text-white w-[10vw]">Survey</div></a>
                    <a href="../AboutUs"><div className="text-2xl font-bold text-white w-[10vw]">About Us</div></a>
                    <a href="../login"><img src="/whiteProfileLogo.svg" alt="Profile" className="w-[5vw] h-[5vh] m-[2.5vh] " /></a>
                    <a href="../"><img src="/whiteHomeLogo.svg" alt="Profile" className="w-[5vw] h-[5vh] m-[2.5vh] " /></a>
                </div>
            </div>
        </>
    );
};

export default NavBar;