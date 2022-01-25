import React, { useReducer, useState } from 'react';
import { StyledDiv } from './StyledDiv.styles';
import { data } from '../Data';

const reduce = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const newItems = [...state.myArray, action.payload];
    return {
      ...state,
      myArray: newItems,
      isModalOpen: true,
      modalContent: '',
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
      dispatch({ type: 'ADD_ITEM', payload: newItem });
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
