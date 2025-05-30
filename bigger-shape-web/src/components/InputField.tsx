function InputField({ type, id, label, options, requiredField, regex, setIsValidInput }) {
  function checkInput(event) {
    // console.log("keyup");
    const value = event.target.value;
    if (!requiredField && value === "") {
      setIsValidInput(prevState => ({
        ...prevState,
        [id]: true
      }));
    } else {
      setIsValidInput(prevState => ({
        ...prevState,
        [id]: regex.test(value)
      }));
    }
  }

  const labelClass = 'text-left pb-[2vh]';
  // console.log(type, id, label, options);
  switch (type) {
    case 'text':
      return (
        <div className="flex mt-[2vh]">
          <label htmlFor={id} className="pr-[1vh] text-white min-w-[10vw]">{label}</label>
          <input type={type} id={id} name={id} className="bg-white rounded text-center" required={requiredField} onChange={checkInput}></input>
          <br></br>
        </div>
      );
    case 'select':
      if (options === null || label === null) {
        return null;
      }
      return (
        <>
          <label className={labelClass}>{label}</label>
          <select id={id} className="bg-white">
            <option value="" disabled selected>
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
