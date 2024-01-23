import logo from "./logo.svg";
import "./App.css";
import { useCallback, useMemo, useState } from "react";
import {
  Button,
  ButtonGroup,
  Checkbox,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";

const filterTypes = [
  "Show all task",
  "Show active tasks",
  "Show completed tasks",
]; // Tất cả, Việc cần làm, Việc đã hoàn thành

function App() {
  const [name, setName] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFilterType, setSelectedFilterType] = useState(filterTypes[0]);

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onAddItem = () => {
    setTodoList((previousList) => {
      return [...previousList, { name: name, isSuccess: false }];
    });
    setName("");
  };

  const onDeleteItem = (item) => {
    setTodoList((previousList) => {
      const nextList = previousList.filter((value) => {
        return value.name !== item.name;
      });

      return nextList;
    });
  };

  const onDoneItem = (item) => () => {
    setTodoList((previousList) => {
      const nextList = previousList.map((value) => {
        if (value.name === item.name) {
          const newItem = {
            name: value.name,
            isSuccess: !value.isSuccess,
          };
          return newItem;
        }
        return value;
      });
      return nextList;
    });
  };

  const onEditItem = (item) => {
    setSelectedItem(item);
    setIsEditing(true);
    setName(item.name);
  };

  const onSaveItem = () => {
    setTodoList((previousList) => {
      return previousList.map((value) => {
        if (value.name === selectedItem.name) {
          return { ...value, name: name };
        }
        return value;
      });
    });
    setName("");
    setSelectedItem();
    setIsEditing(false);
  };

  const onFilterList = () => {
    switch (selectedFilterType) {
      case filterTypes[1]:
        return todoList.filter((value) => value.isSuccess === false);
      case filterTypes[2]:
        return todoList.filter((value) => value.isSuccess === true);
      default:
        return todoList;
    }
  };

  const filteredList = onFilterList();

  return (
    <div className="App">
      <h1 className="app-name">
        <img className="App-logo" src={logo} alt="logo" />
        Todo Matic
      </h1>
      <h1>What need to be done?</h1>
      <div className={"flex-col"}>
        <div className="mb-4 flex-row">
          <Input
            placeholder="Basic usage"
            value={name}
            onChange={onChangeName} // onChange(event);
          />
          <Button
            className="mt-4"
            onClick={isEditing ? onSaveItem : onAddItem}
            type="primary"
          >
            {isEditing ? "Save" : "Add"}
          </Button>
        </div>
      </div>
      {filterTypes.map((filterType) => {
        return (
          <Button colorScheme={filterType === selectedFilterType ? "teal" : undefined}
            className={"mr-4"}
            key={filterType}
            onClick={() => {
              setSelectedFilterType(filterType);
            }}
          >
            {filterType}
          </Button>
        );
      })}
      <Text fontSize="xl">{todoList.length} Tasks remaining</Text>
      <ul>
        {filteredList.map((item, index) => {
          return (
            <li key={`${index}-${item.name}`} className={"mb-4"}>
              <div className={"flex-row"}>
                <input
                  type={"checkbox"}
                  checked={item.isSuccess}
                  onChange={onDoneItem(item)} // onDoneItem(item)(e)
                />
                <h3 className={"display-content"}>{item.name}</h3>
              </div>
              <div className={"flex-row"}>
                <Button
                  className={"mr-4"}
                  onClick={() => {
                    onEditItem(item);
                  }}
                >
                  Edit
                </Button>
                <Button
                  className={"ml-4"}
                  onClick={() => {
                    onDeleteItem(item);
                  }}
                >
                  Delete
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;