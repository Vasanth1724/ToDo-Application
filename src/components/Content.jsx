import React, { useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { CiSaveDown2 } from "react-icons/ci";
import { IoIosAddCircle } from "react-icons/io";

const Content = () => {
  const [items, setItems] = useState([
    { id: 1, label: "HTML & CSS", checked: true },
    { id: 2, label: "Javascript", checked: true },
    { id: 3, label: "React JS", checked: false }
  ]);

  const [newItem, setNewItem] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentElementId, setCurrentElementId] = useState(null);

  const handleChecked = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
  };

  const handleAddOrSaveItems = () => {
    if (!newItem.trim()) return;

    if (isEditing) {
      const updatedItems = items.map((item) =>
        item.id === currentElementId ? { ...item, label: newItem } : item
      );
      setItems(updatedItems);
      setIsEditing(false);
      setCurrentElementId(null);
    } else {
      const newItemObj = {
        id: items.length + 1,
        label: newItem,
        checked: false
      };
      setItems([...items, newItemObj]);
    }
    setNewItem("");
  };

  const handleUpdate = (id) => {
    const selectedItem = items.find((item) => item.id === id);
    setNewItem(selectedItem.label);
    setIsEditing(true);
    setCurrentElementId(id);
  };

  const handleDelete = (id) => {
    const updatedItems = items
      .filter((item) => item.id !== id)
      .map((item, index) => ({ ...item, id: index + 1 }));
    setItems(updatedItems);
  };

  return (
    <main>
      <h1>ToDo Application</h1>
      <div>
        <input
          type="text"
          placeholder="Add new item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button onClick={handleAddOrSaveItems}>
          {isEditing ? <CiSaveDown2 color="green" /> : <IoIosAddCircle color="blue" />}
        </button>
      </div>

      <ul>
        {items.map((item) => (
          <li key={item.id} className="item">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleChecked(item.id)}
            />
            <label>{item.label}</label>
            <FaEdit
              id="edit"
              role="button"
              tabIndex={0}
              onClick={() => handleUpdate(item.id)}
            />
            <FaTrashAlt
              id="delete"
              role="button"
              tabIndex={0}
              onClick={() => handleDelete(item.id)}
            />
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Content;
