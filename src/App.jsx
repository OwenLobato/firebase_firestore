function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2 className="text-center">Formulario de usuarios</h2>
          <form className="form-group">
            <input
              className="form-control"
              placeholder="Introduce el nombre"
              type="text"
            />
            <input
              className="form-control my-2"
              placeholder="Introduce el numero"
              type="text"
            />
            <input
              type="submit"
              value="Registrar"
              className="btn btn-dark btn-block w-100"
            />
          </form>
        </div>
        <div className="col">
          <h2 className="text-center">Lista de usuarios</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
