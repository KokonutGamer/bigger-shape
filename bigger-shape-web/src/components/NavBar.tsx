
function NavBar() {
    return (
        <>
            <div className="flex items-center justify-between bg-blue-500 h-[8vh] w-[80vw] p-[4vh] rounded-lg">
                <a href="../AboutUs"><div className="text-2xl font-bold text-white w-[10vw]">About Us</div></a>
                <a href="../Survey"><div className="text-2xl font-bold text-white w-[10vw]">Survey</div></a>
                <a href="../login"><img src="/whiteProfileLogo.svg" alt="Profile" className="w-[5vw] h-[5vh] m-[2.5vh] " /></a>
                <a href="../"><img src="/whiteHomeLogo.svg" alt="Profile" className="w-[5vw] h-[5vh] m-[2.5vh] " /></a>
            </div>
        </>
    );
}

export default NavBar;  