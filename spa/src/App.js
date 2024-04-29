import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const apiHost = "http://127.0.0.1:3000";
  const [title, setTitle] = useState("Person");
  const [error, setError] = useState(null);
  const [persons, setPersons] = useState([]);
  const [person, setPerson] = useState({ name: "", age: 0 });


  const handleSubmit = (e) => {
    e.preventDefault();
    /*
    //Value can be fetch from e.target and convert that to FormData and store it in db as well
    const form = e.target;
    //for Content-Type=application/formdata || application/url-encoded
    const formData = new FormData(form);
    //console.log(`Method : ${form.method} - FormData : ${formData}`);

    //for Content-Type=application/json
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    */

    fetch(`${apiHost}/person`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //body: JSON.stringify(formJson),
      body: JSON.stringify(person),
    })
      .then((response) => response.json())
      .then((data) => {
        allPerson()
        setPerson({ name: "", age: 0 });
      })
      .then((e) => setError(e));
  };

  const handleDelete = (id) => {
    fetch(`${apiHost}/person/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => allPerson())
      .catch((e) => setError(e.message));
  };

  const handleUpdate = (p) => {
    setPersons(
      persons.map(ip => {
        if(ip._id === p._id ) ip.isEdit = !ip.isEdit
        return ip
      })
    )
  };

  const handleChange = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e, p) => {
    //allow input box to be edit
    setPersons(
      persons.map((ip) =>
        ip._id === p._id ? { ...ip, [e.target.name]: e.target.value } : ip
      )
    );
  };

  const updatePerson = (p) => {
    //save it
    console.log(p)
    fetch(`${apiHost}/person/${p._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(p),
    })
      .then(response => response.json())
      .then(data => console.log('updated'))
      .catch(error => setError(error.message))

    //close 
    setPersons(
      persons.map(ip => {
        if(ip._id === p._id ) ip.isEdit = !ip.isEdit
        return ip
      })
    )
    
  }

  const allPerson = () => {
    fetch(`${apiHost}/person`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const modifiedPersonJson = data.map((d) => {
            d["isEdit"] = false;
            return d;
          });
          setPersons(modifiedPersonJson);
        }
      })
      .catch((e) => setError(e.message));
  }
  
  useEffect(() => {
    console.log('useEffect called')
    allPerson()
  }, []);

  return (
    <div>
      <p>
        {title}
        <i className="material-icons">face</i>
        Management
      </p>
      <hr />
      <form className="person__form" method="post" onSubmit={handleSubmit}>
        <fieldset>
          <legend>New Person:</legend>
          <label>
            <input
              className="person__form__name"
              type="text"
              placeholder="Name"
              name="name"
              value={person.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            <input
              className="person__age"
              type="number"
              placeholder="age"
              name="age"
              value={person.age}
              onChange={handleChange}
            />
          </label>
          <br />

          <button className="person__form__button__submit" type="submit">
            Save
          </button>
          <button className="person__form__button__reset" type="reset">
            Reset
          </button>
        </fieldset>
      </form>

      <p className="person__error">{error}</p>

      <input
        className="person__searchBox"
        type="text"
        placeholder="Search ..."
      />

      {persons.length === 0 ? (
        <p>No data found</p>
      ) : (
        <table>
          <caption>Person List:</caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {persons.map((p) => (
              <tr key={p._id}>
                <td>
                  {p.isEdit ? (
                    <input
                      type="text"
                      name="name"
                      value={p.name}
                      onChange={(e) => handleEditInputChange(e,p)}
                    />
                  ) : (
                    <span>{p.name}</span>
                  )}
                </td>
                <td>
                  {p.isEdit ? (
                    <input
                      type="number"
                      name="age"
                      value={p.age}
                      onChange={(e) => handleEditInputChange(e,p)}
                    />
                  ) : (
                    <span>{p.age}</span>
                  )}
                </td>
                <td>
                  {p.isEdit ? (
                    <i className="action__button material-icons" onClick={() => updatePerson(p)}>save</i>
                  ) : (
                    <i
                      className="action__button material-icons"
                      onClick={() => handleUpdate(p)}
                    >
                      edit
                    </i>
                  )}

                  <i
                    className="action__button material-icons"
                    onClick={() => handleDelete(p._id)}
                  >
                    delete
                  </i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <hr />
      <footer>all right received</footer>
    </div>
  );
}

export default App;
