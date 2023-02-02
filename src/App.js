import "./assets/style.css";
import { Fragment, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [value, setValue] = useState(null);
  const [input, setInput] = useState("");
  const [body, setBody] = useState("");
  const [id, setId] = useState("");

  const fetchData = () => {
    fetch("https://jsonplaceholder.typicode.com/todos/")
      .then((res) => res.json())
      .then((data) => setValue(data))
      .catch((err) => console.log("error: " + err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createTodo = () => {
    if (input.length > 0 && body.length > 0 && id.length > 0) {
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          title: input,
          body: body,
          userId: id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          clearTodo();
          alert("data added successfully");
        })
        .catch((err) => console.log("post error: " + err));
    } else {
      alert("Please fill all the data");
    }
  };
  const clearTodo = () => {
    setInput("");
    setBody("");
    setId("");
  };

  const deleteTodo = (id) => {
    fetch("https://jsonplaceholder.typicode.com/posts/" + id, {
      method: "DELETE",
    });
  };

  // useEffect(() => {
  //   if (value) {
  //     value.map((item) => {
  //       console.log(item.title);
  //       return null;
  //     });
  //   }
  // }, [value]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            {/* <ul>
        {value &&
          value.map((item) => {
            return <li>{item.title}</li>;
          })}
      </ul> */}
            <ul>
              {value &&
                value.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      <li className={item.completed ? "green" : ""}>
                        {item.title} - {item.id}
                        <button onClick={() => deleteTodo(item.id)}>
                          Delete
                        </button>
                      </li>
                    </Fragment>
                  );
                })}
            </ul>
          </div>
          {/* fjdlks */}
          <div
            className="col"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <div className="box">
              <input
                type="text"
                placeholder="Enter Your Todo"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Your body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Your id"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <button onClick={() => createTodo()}>Submit</button>
              <button onClick={clearTodo}>Clear</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
