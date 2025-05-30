function ErrorMessage({ hidden, message }: any) {
    return (
        // <>{!isValidInput && <p className="text-red-500">{message}</p>}</>
        <p className={`text-red-500 ${hidden ? "invisible" : "visible"}`}>{message}</p>


    );
}

export default ErrorMessage