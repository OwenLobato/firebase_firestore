import { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig.js";
import { MESSAGES } from "./MESSAGES.js";

function App() {

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
      console.error("Error adding document: ", e);
    }
    setErrorMsg(null);
    setName("");
    setPhone("");
  };

  useEffect(() => {
    const getUsers = async () => {
      const { docs } = await getDocs(collection(db, "agenda"));
      const newArray = docs.map(item => ({ id: item.id, ...item.data() }));
      setUsers(newArray);
    }
    getUsers();
  }, [users]);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2 className="text-center">Formulario de usuarios</h2>
          <form className="form-group" onSubmit={addUser}>
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
            <input
              type="submit"
              value="Registrar"
              className="btn btn-dark btn-block w-100"
            />
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
                  {item.userName} -- {item.userPhone}
                  <button className="btn btn-danger float-right">Borrar</button>
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
