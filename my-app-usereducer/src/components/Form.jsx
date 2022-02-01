import React, { useEffect, useReducer, useState, useContext } from 'react';
import { StyledDiv } from './StyledDiv.styles';
import { data } from '../Data';
import Modal from './Modal';

const ListContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const newList = [...state.myArray, action.payload];
      return {
        ...state,
        myArray: newList,
        isModalOpen: true,
        modalContent: 'Item Added',
      };
    case 'DELETE_ITEM':
      const filteredArray = state.myArray.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        myArray: filteredArray,
        isModalOpen: true,
        modalContent: 'Item Deleted',
      };
    case 'EDIT_ITEM':
      const editedArray = state.myArray.map((item) => {
        if (item.id === action.payload.id) {
          item = action.payload;
        }
        return item;
      });
      return {
        ...state,
        myArray: editedArray,
        isModalOpen: true,
        modalContent: 'Item Edited',
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
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEditing && inputValue) {
      console.log('sub');
      dispatch({
        type: 'ADD_ITEM',
        payload: { id: Date.now(), inputValue },
      });
    }
    if (isEditing && inputValue) {
      console.log('editing');
      dispatch({ type: 'EDIT_ITEM', payload: { id: editID, inputValue } });
    }
  };

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_ITEM', payload: id });
  };

  const handleEdit = (id, inputValue) => {
    setInputValue(inputValue);
    setIsEditing(true);
    setEditID(id);
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(state.myArray));
    setInputValue('');
    setIsEditing(false);
  }, [state.myArray]);

  return (
    <ListContext.Provider
      value={{
        handleSubmit,
        inputValue,
        setInputValue,
        state,
        handleDelete,
        handleEdit,
      }}
    >
      <StyledDiv>
        <FormInputs />
        <List />
      </StyledDiv>
    </ListContext.Provider>
  );
};

const List = () => {
  const { state, handleDelete, handleEdit } = useContext(ListContext);
  return (
    <ul>
      {state.myArray.map((item) => {
        const { id, inputValue } = item;
        return (
          <li className='list-item' key={id}>
            {inputValue}
            <div className='btn-container'>
              <button onClick={() => handleDelete(id)}>Delete</button>
              <button onClick={() => handleEdit(id, inputValue)}>Edit</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

const FormInputs = () => {
  const { handleSubmit, inputValue, setInputValue } = useContext(ListContext);
  return (
    <form action='' onSubmit={handleSubmit}>
      <input
        type='text'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type='submit'>Submit</button>
    </form>
  );
};

export default Form;
