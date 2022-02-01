import React, { useEffect, useReducer, useState } from 'react';
import { StyledDiv } from './StyledDiv.styles';
// import { data } from '../Data';
import Modal from './Modal';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        myArray: [...state.myArray, action.payload],
        isModalOpen: true,
        modalContent: 'Item Added',
      };
    case 'DELETE_ITEM':
      const filteredState = state.myArray.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        myArray: filteredState,
        isModalOpen: true,
        modalContent: 'Item Deleted',
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
        isModalOpen: true,
        modalContent: 'Item Edited',
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        isModalOpen: false,
        modalContent: '',
      };
    case 'CLEAR_ITEMS':
      return {
        ...state,
        myArray: [],
      };
  }
};

const defaultState = {
  myArray: localStorage.getItem('list')
    ? JSON.parse(localStorage.getItem('list'))
    : [],
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
      setIsEditing(false);
      setName('');
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

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(state.myArray));
  }, [state.myArray]);
  return (
    <StyledDiv>
      {state.isModalOpen && (
        <Modal modalContent={state.modalContent} closeModal={closeModal} />
      )}
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
      {state.myArray.length > 0 && (
        <button onClick={() => dispatch({ type: 'CLEAR_ITEMS' })}>clear</button>
      )}
    </StyledDiv>
  );
};

export default Form;
