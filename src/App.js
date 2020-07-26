import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      // console.log(response);
      setProjects(response.data);
    });
  }, []);


  async function handleAddRepository() {
    // setProjects([...projects, `novo projeto ${Date.now()}`]);
    const response = await api.post('repositories', {
      title: `Novo projeto ${Date.now()}`,
      url: "github.com/repositorio-bootcamp-2020",
      techs: "Node",
      owner: "Thauan Almeida"
    });

    const project = response.data;

    setProjects([...projects, project])
  }

  async function handleRemoveRepository(id, index) {
    await api.delete(`repositories/${id}`);

    projects.splice(projects.indexOf(id), 1);

    setProjects([...projects]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map((item, index) => {
          return (
            <li key={index}>
              <div><h1>{item.title}</h1></div>
              <div>{item.url}</div>
              <div>{item.techs}</div>
              <div>Curtidas: <strong>{item.likes}</strong></div>
              <button onClick={() => handleRemoveRepository(item.id, index)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
