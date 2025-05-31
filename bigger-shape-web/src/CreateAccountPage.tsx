import InputField from "./components/InputField";
import ErrorMessage from "./components/ErrorMessage";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";

function CreateAccountPage() {
    const [isValidInput, setIsValidInput] = useState({
        userName: true,
        password: true,
        confirmPassword: true,
        email: true,
        phoneNumber: true
    });
    const [isValidLength, setIsValidLength] = useState({
        userName: true,
        password: true,
    });
    useEffect(() => {
        console.log(isValidInput);
    }, [isValidInput]);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        const isMatch = password === confirmPassword;
        setIsValidInput(prev => ({
            ...prev,
            confirmPassword: isMatch
        }));
    }, [password, confirmPassword]);

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
                <NavBar />
                <h1 className="text-white text-3xl font-bold mb-4 mt-[9vh] mb-[7vh]">Create Account</h1>
                <div className="flex flex-col items-center justify-center w-[40vw] h-[60vh] bg-gradient-to-br from-blue-200 to-blue-500
                rounded-lg
                text-black
                shadow-md">
                    <InputField type="text" id="userName" label="User Name:" requiredField={true} regex={/^\w*$/} setIsValidInput={setIsValidInput} sizeRange={{ min: 3, max: 20 }} setIsValidLength={setIsValidLength} />
                    <ErrorMessage message="Only Numbers and Letters" hidden={isValidInput.userName} />
                    <ErrorMessage message="Must be between 3 and 20 characters" hidden={isValidLength.userName} />


                    <InputField type="password" id="password" label="New Password:" requiredField={true} regex={/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/} setIsValidInput={setIsValidInput} sizeRange={{ min: 8, max: 20 }} setIsValidLength={setIsValidLength} setCurrentValue={setPassword} />
                    <ErrorMessage message="Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character." hidden={isValidInput.password} />
                    <ErrorMessage message="Must be between 8 and 20 characters" hidden={isValidLength.password} />

                    <InputField type="password" id="passwordConfirm" label="Confirm Password:" requiredField={true} setIsValidInput={setIsValidInput} setCurrentValue={setConfirmPassword} />
                    <ErrorMessage message="Must match password" hidden={isValidInput.confirmPassword} />
                    <ErrorMessage message="Placeholder" hidden={true} />

                    <InputField type="text" id="email" label="Email Address:" requiredField={false} regex={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/} setIsValidInput={setIsValidInput} />
                    <ErrorMessage message="Must be a valid email" hidden={isValidInput.email} />
                    <ErrorMessage message="Placeholder" hidden={true} />


                    <InputField type="text" id="phoneNumber" label="Phone Number:" requiredField={false} regex={/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/} setIsValidInput={setIsValidInput} />
                    <ErrorMessage message="Must be a valid phone number: 123-456-7890" hidden={isValidInput.phoneNumber} />

                    <p className="text-white text-sm text-center mt-[2vh]">* required field</p>

                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-[2vh]">Create Account</button>
            </div>
        </>
    );
}

export default CreateAccountPage;