import { useState } from "react";
import { MESSAGES } from "./MESSAGES.js";

function App() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const checkUsers = (e) => {
    e.preventDefault();
    if (!name.trim()) return setErrorMsg(MESSAGES.ERROR.EMPTY_NAME);
    if (!phone.trim()) return setErrorMsg(MESSAGES.ERROR.EMPTY_PHONE);
    setErrorMsg(null);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2 className="text-center">Formulario de usuarios</h2>
          <form className="form-group" onSubmit={checkUsers}>
            <input
              className="form-control"
              placeholder="Nombre Apellido"
              type="text"
              onChange={(e) => {setName(e.target.value);}}
              />
            <input
              className="form-control my-2"
              placeholder="3121548723"
              type="text"
              onChange={(e) => {setPhone(e.target.value);}}
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
        </div>
      </div>
    </div>
  );
}

export default App;
