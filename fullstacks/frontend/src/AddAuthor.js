import { gql, useMutation } from '@apollo/client';
import React, { useRef } from 'react';

const ADD_AUTHOR = gql`
  mutation AddAuthor($name: String!, $age: Int!) {
    createAuthor(name: $name, age: $age) {
      name
      age
    }
  }
`;

function AddAuthor() {
  const nameInput = useRef(null);
  const ageInput = useRef(null);
  const [addAuthor, { data, loading, error }] = useMutation(ADD_AUTHOR,{
    onCompleted: (data) =>{
      console.log(data);
    },
    onError:()=>{

    },
    
    
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameInput.current.value;
    const age = parseInt(ageInput.current.value);

    addAuthor({ variables: { name, age } });
    
    nameInput.current.value = '';
    ageInput.current.value = '';
  };

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;
  console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" ref={nameInput} />
        <label>Age</label>
        <input type="number" ref={ageInput} />
        <button type="submit">Add Author</button>
      </form>
    </div>
  );
}

export default AddAuthor;
