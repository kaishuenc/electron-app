import { useState, useEffect } from "react"
import "./App.css"

import Header from "./components/header"
import NoteInput from "./components/noteinput"
import NoteCard from "./components/notecard"

interface Note {
  id: number
  title: string
  content: string
  date: number
  color: string
}

const COLORS = ["#fff9c4", "#fce4ec", "#e8f5e9", "#e3f2fd"]

function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem("notes")
    if (saved) setNotes(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  const addNote = () => {
    if (!title || !content) return

    const newNote: Note = {
      id: Date.now(),
      title,
      content,
      date: Date.now(), 
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    }

    setNotes([newNote, ...notes])
    setTitle("")
    setContent("")
  }

  const deleteNote = (id: number) => {
    setNotes(notes.filter(n => n.id !== id))
  }

  return (
    <div className="app">
      <Header count={notes.length} />

      <NoteInput
        title={title}
        content={content}
        setTitle={setTitle}
        setContent={setContent}
        addNote={addNote}
      />

      <div className="notes-grid">
        {notes.map(note => (
          <NoteCard key={note.id} note={note} onDelete={deleteNote} />
        ))}
      </div>
    </div>
  )
}

export default App
