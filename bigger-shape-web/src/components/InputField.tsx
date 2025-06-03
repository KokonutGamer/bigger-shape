function InputField({ type, id, label, options, requiredField, regex, setIsValidInput, sizeRange, setIsValidLength, setCurrentValue, currentValue }) {
  function checkInput(event) {
    if (sizeRange) {
      if (event.target.value.length < sizeRange.min || event.target.value.length > sizeRange.max) {
        setIsValidLength(prevState => ({
          ...prevState,
          [id]: false
        }));
      } else {
        setIsValidLength(prevState => ({
          ...prevState,
          [id]: true
        }));
      }
    }
    // console.log("keyup");
    const value = event.target.value;
    if (!requiredField && value === "") {
      setIsValidInput(prevState => ({
        ...prevState,
        [id]: true
      }));
    } else if (regex) {
      setIsValidInput(prevState => ({
        ...prevState,
        [id]: regex.test(value)
      }));
    }
  }

  function updateCurrentValue(event) {
    setCurrentValue(event.target.value);
  }

  const labelClass = 'text-left pb-[2vh]';
  // console.log(type, id, label, options);
  switch (type) {
    case 'text':
    case 'password':
      return (
        <div className="flex mt-[2vh]">
          <label htmlFor={id} className="pr-[1vh] text-white min-w-[10vw]">{label}</label>
          <input type={type} id={id} name={id} className="bg-white rounded text-center" required={requiredField} onChange={(e) => {
            checkInput(e);
            updateCurrentValue(e);
          }}></input><p><span className="ml-2 text-red-600">{requiredField ? "*" : " "}</span></p>
          <br></br>
        </div >
      );
    case 'select':
      if (options === null || label === null) {
        return null;
      }
      return (
        <>
          <label className={labelClass}>{label}</label>
          <select id={id} className="bg-white" onChange={updateCurrentValue} value={currentValue || "default"}>
            <option value="default" disabled>
              Select Option
            </option>
            {options.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
          <br />
        </>
      );
  }
}

export default InputField;
