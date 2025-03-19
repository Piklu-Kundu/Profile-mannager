import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  async function getData() {
    try {
      const response = await fetch("http://localhost:4000/getdata");
      const result = await response.json();
      console.log("API Response:", result); // Debugging

      if (!response.ok) {
        setError(result.error || "Something went wrong");
        return;
      }

      // Extract the `showAll` array if it exists
      if (result.showAll && Array.isArray(result.showAll)) {
        setData(result.showAll);
      } else {
        console.error("Unexpected data format:", result);
        setData([]); // Default to empty array
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setError("Failed to fetch data");
    }
  }

  const handleDelete=async (id)=>{
    const response=await fetch(`http://localhost:4000/${id}`,{
      method:"DELETE"
    });

    const result=await response.json();

    if(!response.ok){
      console.log(result.error);
      setError(result.error);
    }
    if(response.ok){
      setError("Deleted successfully");
      setTimeout(() => {
        setError("");
        getData();
      }, 5000);
       
      
    }
  }


  

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container my-2">
       {error && <div class="alert alert-danger" >
  {error}
</div>}
      <h2 className="text-center">All Data</h2>

      {error && <p className="text-danger text-center">{error}</p>}

      <div className="row">
        {data.length > 0 ? (
          data.map((ele) => (
            <div key={ele._id} className="col-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{ele.name}</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">{ele.email}</h6>
                  <p className="card-text">{ele.age}</p>
                  <Link to="" className="card-link" onClick={()=>{handleDelete(ele._id)}}>Delete</Link>
                  <Link to={`/${ele._id}`} className="card-link">Edit</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No data available</p>
        )}
      </div>
    </div>
  );
};

export default Read;
