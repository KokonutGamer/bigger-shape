function ProgressBar(props){
    // console.log(props.progress);
    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-4">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${props.percent}%` }}></div>
        </div>
    );
}

export default ProgressBar;