import React, { useEffect, useReducer, useState } from 'react';
import { StyledDiv } from './StyledDiv.styles';
import { data } from '../Data';
import Modal from './Modal';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        myArray: [...state.myArray, action.payload],
      };
    case 'DELETE_ITEM':
      const filteredState = state.myArray.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        myArray: filteredState,
      };
    case 'EDIT_ITEM':
      const newArray = state.myArray.map((item) => {
        if (item.id === action.payload.id) {
          item = action.payload;
        }
        return item;
      });
      return {
        ...state,
        myArray: newArray,
      };
  }
};

const defaultState = {
  myArray: [],
  isModalOpen: false,
  modalContent: '',
};

const Form = () => {
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing && name) {
      dispatch({ type: 'EDIT_ITEM', payload: { id: editID, name: name } });
    }
    if (!isEditing && name) {
      dispatch({ type: 'ADD_ITEM', payload: { id: Date.now(), name: name } });
      setName('');
    }
  };

  const handleEditing = (name, id) => {
    setName(name);
    setIsEditing(true);
    setEditID(id);
  };
  return (
    <StyledDiv>
      {/* {state.isModalOpen && (
        <Modal modalContent={state.modalContent} closeModal={closeModal} />
      )} */}
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
            <button
              onClick={() =>
                dispatch({
                  type: 'DELETE_ITEM',
                  payload: { id: id },
                })
              }
            >
              delete
            </button>
            <button onClick={() => handleEditing(name, id)}>edit</button>
          </div>
        );
      })}
    </StyledDiv>
  );
};

export default Form;
