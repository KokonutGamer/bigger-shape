
/**
 * A component that displays an error message.
 *
 * Props:
 * - hidden: A boolean that determines the visibility of the message. 
 *   If true, the message is hidden; otherwise, it is visible.
 * - message: The error message string to display.
 */

function ErrorMessage({ hidden, message }: any) {
    return (
        <p className={` width-[75%] text-red-500 text-sm text-center ${hidden ? "invisible" : "visible"}`}>{message}</p>


    );
}

export default ErrorMessage