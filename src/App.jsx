import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig.js";
import { MESSAGES } from "./MESSAGES.js";

function App() {

  const [editMode, setEditMode] = useState(false);
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const addUser = async (e) => {
    e.preventDefault();
    if (!name.trim()) return setErrorMsg(MESSAGES.ERROR.EMPTY_NAME);
    if (!phone.trim()) return setErrorMsg(MESSAGES.ERROR.EMPTY_PHONE);
    try {
      const user = {
        userName: name,
        userPhone: phone
      };
      await addDoc(collection(db, "agenda"), user)
        .then(alert(MESSAGES.USER_CREATED))
    } catch (e) {
      alert(MESSAGES.ERROR.USER_NOT_CREATED, e.message);
    }
    setErrorMsg(null);
    setName("");
    setPhone("");
  };

  const getUsers = async () => {
    const { docs } = await getDocs(collection(db, "agenda"));
    const newArray = docs.map(item => ({ id: item.id, ...item.data() }));
    setUsers(newArray);
  }

  const deleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "agenda", id))
        .then(alert(MESSAGES.USER_DELETED));
    } catch (error) {
      console.log(error);
    }
  }

  const getUser = async (id) => {
    const docRef = doc(db, "agenda", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { userName, userPhone } = docSnap.data();
      setUserId(id);
      setName(userName);
      setPhone(userPhone);
      setEditMode(true);
      alert(MESSAGES.USER_FIND);
    } else {
      alert(MESSAGES.ERROR.USER_NOT_FIND);
    }
  }

  const updateUser = async (e) => {
    e.preventDefault();
    if (!name.trim()) return setErrorMsg(MESSAGES.ERROR.EMPTY_NAME);
    if (!phone.trim()) return setErrorMsg(MESSAGES.ERROR.EMPTY_PHONE);
    try {
      const userUpdated = {
        userName: name,
        userPhone: phone
      };
      await setDoc(doc(db, "agenda", userId), userUpdated)
        .then(alert(MESSAGES.USER_UPDATED));
    } catch (error) {
      console.log(error);
    }
    setUserId("");
    setName("");
    setPhone("");
    setEditMode(false);
  }

  useEffect(() => {
    getUsers();
  }, [users]);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2 className="text-center">Formulario de usuarios</h2>
          <form className="form-group" onSubmit={editMode ? updateUser : addUser}>
            <input
              className="form-control"
              placeholder="Nombre Apellido"
              type="text"
              onChange={(e) => { setName(e.target.value); }}
              value={name}
            />
            <input
              className="form-control my-2"
              placeholder="3121548723"
              type="text"
              onChange={(e) => { setPhone(e.target.value); }}
              value={phone}
            />
            {
              editMode
                ? (
                  <input
                    type="submit"
                    value="Editar"
                    className="btn btn-dark btn-block w-100"
                  />
                )
                : (
                  <input
                    type="submit"
                    value="Registrar"
                    className="btn btn-dark btn-block w-100"
                  />
                )
            }
          </form>
          {
            errorMsg
              ? (<div><p>{errorMsg}</p></div>)
              : (null)
          }
        </div>
        <div className="col">
          <h2 className="text-center">Lista de usuarios</h2>
          <ul className="list-group">{
            users.length !== 0
              ? (users.map(item => (
                <li className="list-group-item d-flex justify-content-between" key={item.id}>
                  <div>
                    {item.userName} -- {item.userPhone}
                  </div>
                  <div>
                    <button className="btn btn-info mx-2" onClick={(id) => { getUser(item.id) }}>
                      Actualizar
                    </button>
                    <button className="btn btn-danger" onClick={(id) => { deleteUser(item.id) }}>
                      Borrar
                    </button>
                  </div>
                </li>
              )))
              : (<span>Sin usuarios registrados</span>)
          }</ul>
        </div>
      </div>
    </div>
  );
}


export default App;
