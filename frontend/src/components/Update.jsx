import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const Update = () => {
  const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(0);
    const {id}=useParams();
    const navigate=useNavigate();

const getSingleUser=async ()=>{
  console.log("ID before fetch:", typeof id);

  const response=await fetch(`http://localhost:4000/${id}`);

  const result=await response.json();

  if(!response.ok){
    console.log(result.error);
    setError(result.error);
  }
  if(response.ok){
    setError("");
    console.log("updated user",result);
    setName(result.name);
    setEmail(result.email);
    setAge(result.age);
  }


};
useEffect(() => {
  
getSingleUser();

},[] )

const handleUpdate=async(event)=>{
  event.preventDefault();

    const updatedUser = { name, email, age };

    const response = await fetch(`http://localhost:4000/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedUser),
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
      
      navigate("/all");
    }
}


  return (
    <div><div classNameName='container my-2'>

    {error && <div class="alert alert-danger" >
{error}
</div>}
    <h2 className='text-center'>Edit Your Data</h2>

    <form onSubmit={handleUpdate}>
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
  </div></div>
  )
}

export default Update