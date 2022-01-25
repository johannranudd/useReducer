import React, { useReducer, useState } from 'react';
import { StyledDiv } from './StyledDiv.styles';
import { data } from '../Data';

const reduce = (state, action) => {
  if (action.type === 'TESTING') {
    const newArray = [...state.myArray, action.payload];
    return {
      ...state,
      myArray: newArray,
      isModalOpen: true,
      modalContent: 'open modal',
    };
  }
  return state;
};

const defaultState = {
  myArray: [],
  isModalOpen: false,
  modalContent: '',
};

const Form = () => {
  const [name, setName] = useState('');
  const [state, dispatch] = useReducer(reduce, defaultState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      const newItem = { id: new Date().getTime().toString(), name };
      dispatch({ type: 'TESTING', payload: newItem });
      setName('');
    }
  };
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
        {state.myArray.map((item) => {
          const { id, name } = item;
          return <li key={id}>{name}</li>;
        })}
      </ul>
    </StyledDiv>
  );
};

export default Form;
