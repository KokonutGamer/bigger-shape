type ProgressBarProps = {
    percent: number;
};

/**
 * A React component that displays a horizontal progress bar.
 *
 * @param {number} props.percent The percentage of the progress bar that should be filled.
 * @returns {ReactElement} The rendered progress bar component.
 */
function ProgressBar(props: ProgressBarProps) {
    return (
        <>
            <p className="text-xl mb-2 text-center">Progress: {Math.round(props.percent)}%</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-8">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${props.percent}%` }}></div>
            </div>
        </>
    );
}

export default ProgressBar;