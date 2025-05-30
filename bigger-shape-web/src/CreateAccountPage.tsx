import InputField from "./components/InputField";
import { useEffect, useState } from "react";

function CreateAccountPage() {
    const [isValidInput, setIsValidInput] = useState(true);
    useEffect(() => {
        console.log(isValidInput);
    }, [isValidInput]);
    return (
        <>
            <style> 
                            {`
                    body {
                        background-image: linear-gradient(to top left, #bfdbfe, #3b82f6);
                    }    
                    `}
            </style>
            <div className="flex flex-col items-center justify-center h-[100vh] w-[100vw]">
                <h1 className="text-3xl font-bold mb-4">Create Account</h1>
                <div className="flex flex-col items-center justify-center w-[40vw] h-[60vh] bg-gradient-to-br from-blue-200 to-blue-500
                rounded-lg
                text-black
                shadow-md">
                    <InputField type="text" id="userName" label="UserName:" requiredField={true} regex={/[a-zA-Z]/} setIsValidInput={setIsValidInput}/>
                    {/* <InputField type="text" id="password" label="New Password:" requiredField={true} regex={""} />
                    <InputField type="text" id="passwordConfrim" label="Confirm Password:" requiredField={true} />


                    <InputField type="text" id="email" label="Email Address:" requiredField={false} />
                    <InputField type="text" id="phoneNumber" label="Phone Number:" requiredField={false} /> */}
                </div>
            </div>
        </>
    );
}

export default CreateAccountPage;