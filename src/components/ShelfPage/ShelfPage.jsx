import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

function ShelfPage() {
  const dispatch = useDispatch();
  const items = useSelector((store) => store.shelfItems);
  const user = useSelector((store) => store.user);

  const [descriptionInput, setDescriptionInput] = useState("");
  const [imageInput, setImageInput] = useState("");

  useEffect(() => {
    dispatch({ type: "FETCH_SHELF" });
  }, []);

  const deleteItem = (item) => {
    let data = {
      id: item.id,
      user_id: item.user_id,
    };
    dispatch({ type: "DELETE_ITEM", payload: data });
  };

  const handleImage = (event) => {
    event.preventDefault();
    setImageInput(event.target.value);
  };

  const handleDescription = (event) => {
    event.preventDefault();
    setDescriptionInput(event.target.value);
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    let data = {
      description: descriptionInput,
      image_url: imageInput,
      user_id: user.id,
    };
    dispatch({
      type: "ADD_ITEM",
      payload: data,
    });
  };

  return (
    <div className="container">
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Description</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <img src={item.image_url} />
                </td>
                <td>
                  <p>{item.description}</p>
                </td>
                <td>
                  {item.user_id === user.id && (
                    <button onClick={() => deleteItem(item)}>Delete</button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <form>
        <input placeholder="Description" onChange={handleDescription} />
        <input placeholder="Image URL" onChange={handleImage} />
        <button onClick={handleSubmit}>Add Item</button>
      </form>
    </div>
  );
}

export default ShelfPage;
