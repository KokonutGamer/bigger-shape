
function NavBar() {
    return (
        <>
        <div className="flex items-center justify-between bg-blue-500 h-[8vh] w-[80vw] p-[4vh] rounded-lg">
            <a href="../Survey"><div className="text-2xl font-bold text-white w-[10vw]">About Us</div></a>
            <a href="../Survey"><div className="text-2xl font-bold text-white w-[10vw]">Survey</div></a>
            <img src="/profileLogo.svg" alt="Profile" className="w-[5vw] h-[5vh] m-[2.5vh] " />
        </div>
        </>
    );
}

export default NavBar;  