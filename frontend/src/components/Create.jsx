import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Create = () => {
   const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);

  const navigate=useNavigate();
  console.log(name, email, age);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const addUser = { name, email, age };

    const response = await fetch("http://localhost:4000", {
      method: 'POST',
      body: JSON.stringify(addUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if(!response.ok){
      console.log(result.error);
      setError(result.error);
    }
    if(response.ok){
      console.log(result);
      setError("");
      setName("");
      setEmail("");
      setAge(0);
      navigate("/all");
    }
  }
  return (
    <div classNameName='container my-2'>

      {error && <div class="alert alert-danger" >
  {error}
</div>}
      <h2 classNameName='text-center'>Enter Your Data</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={name}
            onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input type="number" className="form-control" id="exampleInputPassword1" value={age}
            onChange={(e) => setAge(e.target.value)} />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Create