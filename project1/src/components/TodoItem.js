import React, { Component } from "react";
import "./TodoItemList";

class TodoItem extends Component {
  render() {
    const { text, checked, id, onToggle, onRemove } = this.props;

    return (
      <div className="todo-item" onClick={() => onToggle(id)}>
        <div
          className="remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(id);
          }}
        >
          {" "}
          &times;
        </div>
      </div>
    );
  }
}

export default TodoItem;
