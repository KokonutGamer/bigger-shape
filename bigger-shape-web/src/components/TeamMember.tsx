// information for each team member
type TeamMemberProps = {
    name: string;
    github: string;
    linkedin: string;
};

/**
 * A functional component that renders a single team member's information.
 *
 * It displays the member's name, a link to their GitHub profile, and a link to their LinkedIn profile.
 *
 * @param {TeamMemberProps} props - The props object containing the team member's information.
 * @returns {ReactElement} The rendered TeamMember component.
 */
function TeamMember(props: TeamMemberProps) {
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