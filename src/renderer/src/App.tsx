// src/App.tsx
import { useState, useEffect } from 'react'
import './App.css'
interface Todo {
id: number
text: string
done: boolean
}
function App() {
const [todos, setTodos] = useState<Todo[]>([])
const [input, setInput] = useState('')
// Load from localStorage when app opens
useEffect(() => {
const saved = localStorage.getItem('todos')
if (saved) setTodos(JSON.parse(saved))
}, [])
// Save to localStorage whenever todos change
useEffect(() => {
localStorage.setItem('todos', JSON.stringify(todos))
}, [todos])
const addTodo = (): void => {
if (!input.trim()) return
setTodos(prev => [...prev, { id: Date.now(), text: input.trim(), done:
false }])
setInput('')
}
const toggleTodo = (id: number): void =>
setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
const deleteTodo = (id: number): void =>
setTodos(prev => prev.filter(t => t.id !== id))
return (
<div className="app">
<h1>My Todo List</h1>
<div className="input-row">
<input
value={input}
onChange={e => setInput(e.target.value)}
onKeyDown={e => e.key === 'Enter' && addTodo()}
placeholder="What needs to be done?"
/>
<button onClick={addTodo}>Add</button>
</div>
{todos.length === 0 && (
<p className="empty">No todos yet, add one above!</p>
)}
<ul>
{todos.map(todo => (
<li key={todo.id} className={todo.done ? 'done' : ''}>
<input
type="checkbox"
checked={todo.done}
onChange={() => toggleTodo(todo.id)}
/>
<span>{todo.text}</span>
<button className="delete" onClick={() =>
deleteTodo(todo.id)}>x</button>
</li>
))}
</ul>
{todos.length > 0 && (
<p className="summary">
{todos.filter(t => t.done).length} of {todos.length} done
</p>
)}
</div>
)
}
export default App
