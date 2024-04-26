import { useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("Person");
  const [error, setError] = useState(null);
  const [persons, setPersons] = useState([]);
  const [person, setPerson] = useState({ name: "", age: 0 });

  return (
    <div>
      <p>
        {title}
        <i className="material-icons">face</i>
        Management
      </p>
      <hr />
      <form className="person__form" onSubmit={(e) => e.preventDefault()}>
        <fieldset>
          <legend>New Person:</legend>
          <input
            className="person__form__name"
            type="text"
            placeholder="Name"
          />
          <br />
          <input className="person__age" type="number" placeholder="age" />
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
            <tr>
              <td>
                {true ? <span>John</span> : <input type="text" value="John" />}
              </td>
              <td>
                {true ? <span>40</span> : <input type="number" value="40" />}
              </td>
              <td>
                <i className="action__button material-icons">edit</i>
                <i className="action__button material-icons">save</i>
                <i className="action__button material-icons">delete</i>
              </td>
            </tr>
          </tbody>
        </table>
      )}

      <hr />
      <footer>all right received</footer>
    </div>
  );
}

export default App;
