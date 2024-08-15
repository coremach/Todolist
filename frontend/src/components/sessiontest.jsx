import React, { useState, useEffect } from 'react';

const TestSessionStorage = () => {
  const [val, setValue] = useState({});

  useEffect(() => {
    // Retrieve value from sessionStorage when component mounts
    const storedValue = sessionStorage.getItem('testKey');
    if (storedValue) {
      setValue(storedValue);
    }
  }, []);
  const change = (e) => {
    const { name, value } = e.target
    setValue({...value,[name]:value})
    // console.log(e.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const { name, value } = e.target
    // console.log(val.text);
    setValue({text:""})
    // Store the new value in sessionStorage
    sessionStorage.setItem('testKey', val.text);
    const getval = sessionStorage.getItem('testKey');
    console.log(getval); // Should output 'testValue'
  };

  return (
    <div className='container d-flex justify-content-center align-items-center flex-column'>
      <form
        className="d-flex justify-content-center align-items-center flex-column"
        onSubmit={handleSubmit}>

        <input
          className='p-2 my-3 input-signup'
          type='text'
          placeholder='Type something...'
          name='text'
          onChange={change}
          value={val.text || " "}

        />        
        <button className='btn-signup ' type="submit" >Click</button>
      </form>
      <p>Stored value: {val.val}</p>
    </div>
  );
};

export default TestSessionStorage;
