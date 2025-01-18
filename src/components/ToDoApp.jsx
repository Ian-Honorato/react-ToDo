import { useState, useEffect } from "react";
import style from "./ToDoApp.module.css";
import { use } from "react";

export default function ToDoApp() {
  const [tarefas, setTarefas] = useState(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    //retorno o valor do localstorage se existir, se nao retorno um array vazio
    return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
  });

  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      alert("Digite uma tarefa");
      return;
    } else {
      const novaTarefa = {
        id: Date.now(),
        text: input,
      };
      setTarefas((prevTarefas) => [...prevTarefas, novaTarefa]);
      setInput("");
    }
  };
  function handleDelet(id) {
    const novaTarefas = tarefas.filter((tarefa) => tarefa.id !== id);
    setTarefas(novaTarefas);
  }

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  });

  return (
    <>
      <div className={style.containerTodo}>
        <h1 className={style.title}>Lista de tarefas</h1>
        <div className="form">
          <form onSubmit={handleSubmit} className={style.formStyle}>
            <input
              type="text"
              value={input}
              className={style.inputTarefa}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Adcione uma tarefa"
            />
            <button type="submit" className={style.addTarefa}>
              {" "}
              Adicionar
            </button>
          </form>
        </div>
        <div>
          <h2 className={style.title}>Tarefas</h2>
          {tarefas.length === 0 && <p>Voce ainda nao tem tarefas</p>}
          <ul className={style.listaTarefa}>
            {tarefas.map((tarefa) => {
              return (
                <li className={style.itemTarefa} key={tarefa.id}>
                  <span>{tarefa.text}</span>
                  <span>
                    <button
                      onClick={() => handleDelet(tarefa.id)}
                      className={style.buttonDelete}
                    >
                      delete
                    </button>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
