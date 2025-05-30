import InputField from "./components/InputField";
import ErrorMessage from "./components/ErrorMessage";
import { useEffect, useState } from "react";

function CreateAccountPage() {
    const [isValidInput, setIsValidInput] = useState({
        userName: true,
        password: true,
        email: true,
        phoneNumber: true
    });
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
                    <InputField type="text" id="userName" label="UserName:" requiredField={true} regex={/^\w*$/} setIsValidInput={setIsValidInput} />
                    <ErrorMessage message="Only Numbers and Letters" hidden={isValidInput.userName} />

                    <InputField type="text" id="password" label="New Password:" requiredField={true} regex={""} />

                    <InputField type="text" id="passwordConfrim" label="Confirm Password:" requiredField={true} />


                    <InputField type="text" id="email" label="Email Address:" requiredField={false} regex={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/} setIsValidInput={setIsValidInput} />
                    <ErrorMessage message="Must be a valid email" hidden={isValidInput.email} />


                    <InputField type="text" id="phoneNumber" label="Phone Number:" requiredField={false} regex={/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
                    } setIsValidInput={setIsValidInput} />
                    <ErrorMessage message="Must be a valid phone number: 123-456-7890" hidden={isValidInput.phoneNumber} />

                </div>
            </div>
        </>
    );
}

export default CreateAccountPage;