function SurveyField({ type, id, label, options }) {
  const labelClass = 'text-left pb-[2vh]';
  console.log(type, id, label, options);
  switch (type) {
    case 'text':
      return (
        <>
          <label for={id}>{label}</label>
          <input type={type} id={id} name={id}></input>
          <br></br>
        </>
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

export default SurveyField;
