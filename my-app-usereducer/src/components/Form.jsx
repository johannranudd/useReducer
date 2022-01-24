import React, { useEffect, useState } from 'react';
import { StyledDiv } from './StyledDiv.styles';
import { data } from '../Data';

const Form = () => {
  const [name, setName] = useState('');
  const [people, setPeople] = useState(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      const newPerson = { id: new Date().getTime().toString(), name };
      //   console.log(newPerson);
      setPeople((prev) => {
        return [...prev, newPerson];
      });
      //   console.log(people);
    }
  };

  //   useEffect(() => {
  //     console.log(people);
  //   }, [people]);

  return (
    <StyledDiv>
      <form action='' onSubmit={handleSubmit}>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
      <ul>
        {people.map((item) => {
          const { id, name } = item;
          return <li key={id}>{name}</li>;
        })}
      </ul>
    </StyledDiv>
  );
};

export default Form;
