import React, { useReducer, useState } from 'react';
import { StyledDiv } from './StyledDiv.styles';
import { data } from '../Data';
import { type } from '@testing-library/user-event/dist/type';

const reducer = (state, action) => {
  if (action.type === 'TESTING') {
    // console.log(state);
    // const newItems = { ...state };
    return { ...state, people: [], isModalOpen: true, modalContent: 'open' };
  }
  return state;
};

const defaultState = {
  people: [],
  isModalOpen: false,
  modalContent: '',
};

const Form = () => {
  const [name, setName] = useState('');
  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      const newItem = { name, id: new Date().getTime().toString() };
      //   console.log(newItem);
      dispatch({ type: 'TESTING', payload: newItem });
      //   console.log(state);
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
      <ul></ul>
    </StyledDiv>
  );
};

export default Form;
