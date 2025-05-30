function ErrorMessage({ hidden, message }: any) {
    return (
        // <>{!isValidInput && <p className="text-red-500">{message}</p>}</>
        <p className={` width-[75%] text-red-500 text-sm text-center ${hidden ? "invisible" : "visible"}`}>{message}</p>


    );
}

export default ErrorMessage