"use client";

import React, { useState, useEffect } from "react";

// type declaration
interface Todo {
  activity: string;
  price: number;
  type: string;
  bookingRequired: boolean;
  accessibility: number;
}

// stored the type array in case we are pulling the values from API
const todoType = [
  {
    name: "Select Type",
    value: "",
  },
  {
    name: "Education",
    value: "education",
  },
  {
    name: "Recreational",
    value: "recreational",
  },
  {
    name: "Social",
    value: "social",
  },
  {
    name: "DIY",
    value: "diy",
  },
  {
    name: "Charity",
    value: "charity",
  },
  {
    name: "Cooking",
    value: "cooking",
  },
  {
    name: "Relaxation",
    value: "relaxation",
  },
  {
    name: "Music",
    value: "music",
  },
  {
    name: "Busywork",
    value: "busywork",
  },
];

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("todos");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [success, setSuccess] = useState(false);
  const [activity, setActivity] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [type, setType] = useState("");
  const [bookingRequired, setBookingRequired] = useState(false);
  const [accessibility, setAccessibility] = useState(0.5);
  const [errors, setErrors] = useState({
    activity: false,
    price: false,
    type: false,
  });

  // handling: 4. If the user leaves the page and returns at a later time, the previous state of the list should be restored
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // function to add the todo items
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // resetting the validation messages on submit
    setErrors({
      activity: !activity.trim(),
      price: price === "",
      type: !type,
    });

    if (activity.trim() && price !== "" && type) {
      const newTodo: Todo = {
        activity: activity.trim(),
        price: Number(price),
        type,
        bookingRequired,
        accessibility,
      };
      setTodos([...todos, newTodo]);
      setActivity("");
      setPrice("");
      setType("");
      setBookingRequired(false);
      setAccessibility(0.5);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  // handling: 2. Next to each item in the list, there should be a delete button which removes the item from the list when pressed
  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <>
      <h1 className="text-2xl font-bold">Todo List</h1>
      {/* Todo Form */}
      {/* handling: 1. Include a form consisting of the following fields and a submit button. */}
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col gap-4">
          <div>
            <input
              type="text"
              value={activity}
              onChange={(e) => {
                setActivity(e.target.value);
                setErrors((prev) => ({ ...prev, activity: false }));
              }}
              placeholder="Activity"
              className={`flex-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.activity ? "border-red-500" : ""
              }`}
            />
            {errors.activity && (
              <p className="text-red-500 text-sm mt-1">Activity is required</p>
            )}
          </div>

          <div>
            <input
              type="number"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                setErrors((prev) => ({ ...prev, price: false }));
              }}
              placeholder="Price"
              className={`flex-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.price ? "border-red-500" : ""
              }`}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">Price is required</p>
            )}
          </div>

          <div>
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setErrors((prev) => ({ ...prev, type: false }));
              }}
              className={`flex-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.type ? "border-red-500" : ""
              }`}
            >
              {/* mapping each of the options from todotype and setting the first object as disabled */}
              {todoType.map((option, index) => (
                <option
                  key={index}
                  value={option.value}
                  disabled={index === 0 ? true : undefined}
                >
                  {option.name}
                </option>
              ))}
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">Type is required</p>
            )}
          </div>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={bookingRequired}
              onChange={(e) => setBookingRequired(e.target.checked)}
              className="mr-2"
            />
            Booking Required
          </label>
          <label className="flex items-center">
            Accessibility:
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={accessibility}
              onChange={(e) => setAccessibility(parseFloat(e.target.value))}
              className="ml-2"
            />
          </label>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
          {success && (
            <p className="text-green-500 text-sm mt-1">
              Todo item added successfully!
            </p>
          )}
        </div>
      </form>

      {/* Todo List */}
      <p className="text-md text-end w-full">
        {/* handling: 3. At the top of the list, display a count of the total number of items in the list */}
        Todo items: <strong>{todos.length}</strong>
      </p>
      <ul className="w-full space-y-2">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="flex flex-row p-4 bg-stone-900 rounded-lg shadow"
          >
            <div className="flex flex-col w-3/3">
              <span>
                <strong>Activity:</strong> {todo.activity}
              </span>
              <span>
                <strong>Price:</strong> RM {todo.price}
              </span>
              <span className="capitalize">
                <strong>Type:</strong> {todo.type}
              </span>
              <span>
                <strong>Booking Required:</strong>{" "}
                {todo.bookingRequired ? "Yes" : "No"}
              </span>
              <span>
                <strong>Accessibility:</strong> {todo.accessibility}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(index)}
              className="mt-2 text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
