function TeamMember(props) {
    return (
        <>
            <div className="flex justify-center items-center w-[100%]">
                <div className="flex justify-start items-center pt-[2vh] w-[30%]">
                    <p className="text-md text-white mr-[2vh]">{props.name}</p>
                </div>
                <div className="flex justify-end items-center pt-[2vh] w-[30%]">
                    <a href={props.github} className="w-[3vw]">
                        <img src="githubLogo.png" alt="github" className="w-[3vw] " />
                    </a>
                    <a href={props.linkedin} className="w-[3vw] ml-[2vh]">
                        <img src="linkedinLogo.svg" alt="linkedin" className="w-[3vw]" />
                    </a>
                </div>
            </div>
        </>
    )
}

export default TeamMember