import React, { useEffect, useReducer, useState } from 'react';
import { StyledDiv } from './StyledDiv.styles';
import { data } from '../Data';
import Modal from './Modal';

const reduce = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const newItems = [...state.myArray, action.payload];
    return {
      ...state,
      myArray: newItems,
      isModalOpen: true,
      modalContent: 'Item Added',
    };
  }
  if (action.type === 'DELETE_ITEM') {
    const filterArray = state.myArray.filter((item) => {
      if (item.id !== action.payload) {
        return item;
      }
    });
    return {
      ...state,
      myArray: filterArray,
      isModalOpen: true,
      modalContent: 'Item Deleted',
    };
  }
  if (action.type === 'EDIT_ITEM') {
    // const newArray = state.myArray.map((item) => {
    //   if (item.id === action.payload) {
    //     console.log(item);
    //   }
    // });
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
      setName('');
    }
  };

  const deleteItem = (id) => {
    dispatch({ type: 'DELETE_ITEM', payload: id });
  };

  const editItem = (id) => {
    dispatch({ type: 'EDIT_ITEM', payload: id });
  };

  return (
    <StyledDiv>
      {state.isModalOpen && <Modal modalContent={state.modalContent} />}
      <form action='' onSubmit={handleSubmit}>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
      {state.myArray.map((item) => {
        const { id, name } = item;
        return (
          <div key={id} className='list-item'>
            <p>{name}</p>
            <button onClick={() => deleteItem(id)}>delete</button>
            <button onClick={() => editItem(id)}>edit</button>
          </div>
        );
      })}
    </StyledDiv>
  );
};

export default Form;
