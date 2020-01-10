import ReactDOM from "react-dom";
import React, { Component } from "react";

class Todo extends Component {
  state = {
    data_object: {},
    index_pos: "",
    times: []
  };

  componentDidMount() {}

  getNames = e => {
    const { name, value } = e.target;
    const data = { [name]: value };
    const newData = Object.assign(this.state.data_object, data);
    this.setState({
      data_object: newData
    });
  };

  addItem = e => {
    e.preventDefault();
    let data = this.state.data_object;
    this.setState({
      times: this.state.times.concat(data),
      data_object: {}
    });
  };

  edit = (e, index) => {
    e.preventDefault();
    const save_index = index;
    let data_times = this.state.times;
    let data_pos = data_times[index];
    let item = data_pos.item;
    let select = data_pos.select;

    this.setState({
      index_pos: save_index,
      data_object: {
        item: item,
        select: select
      }
    });
  };

  save = e => {
    e.preventDefault();
    let index = this.state.index_pos;
    let data_times = this.state.times;
    let data_obj = this.state.data_object;
    console.log("data_times ", data_times);

    for (let i = 0; i < data_times.length; i++) {
      if (i === index) {
        let find_pos = data_times.indexOf(data_times[index]);
        let newData = data_times.map((value, index) => {
          if (index === find_pos) return data_obj;
          return value;
        });
        console.log("viejo ", newData);

        this.setState({
          times: newData
        });
        console.log("nuevo ", this.state.times);
      }
    }
  };

  render() {
    let get_times = this.state.times.map((value, index) => {
      return (
        <li key={index} style={{ marginTop: "10px" }}>
          {value.item} - {value.select}
          <button
            style={{
              background: "#50d890",
              padding: "3px",
              color: "#FFF",
              borderRadius: "5px",
              marginLeft: "5px",
              paddingLeft: "5px",
              paddingRight: "5px",
              border: "black"
            }}
            onClick={e => this.edit(e, index)}
          >
            Editar
          </button>
          <button
            style={{
              background: "#f0134d",
              padding: "3px",
              color: "#FFF",
              borderRadius: "5px",
              marginLeft: "5px",
              paddingLeft: "5px",
              paddingRight: "5px",
              border: "black"
            }}
          >
            X
          </button>
        </li>
      );
    });
    return (
      <div>
        <form>
          <input
            name="item"
            placeholder="Nombre del tiempo"
            value={this.state.data_object.item || ""}
            onChange={e => this.getNames(e)}
          />
          <select
            name="select"
            value={this.state.data_object.select || ""}
            onChange={e => this.getNames(e)}
          >
            <option>No Requerido</option>
            <option>Requerido</option>
          </select>
          <button onClick={e => this.addItem(e)}>Añade otro</button>
          <button onClick={e => this.save(e)}>Guardar</button>
        </form>
        <div>
          <h4>Mis Tiempos:</h4>
          <ul>{get_times}</ul>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Todo />, document.getElementById("root"));
