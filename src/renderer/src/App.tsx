import { useState, useEffect } from 'react'
import './App.css'

import Header from './components/header'
import NoteInput from './components/noteinput'
import NoteCard from './components/notecard'

interface Note {
  id: number
  title: string
  content: string
  date: number
  color: string
}

const COLORS = ['#fff9c4', '#fce4ec', '#e8f5e9', '#e3f2fd']

function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('notes')
    if (saved) setNotes(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  const addNote = () => {
    if (!title.trim() || !content.trim()) return

    const newNote: Note = {
      id: Date.now(),
      title,
      content,
      date: Date.now(),
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    }

    setNotes([newNote, ...notes])
    setTitle('')
    setContent('')
  }

  const deleteNote = (id: number) => {
    setNotes(notes.filter((n) => n.id !== id))
  }

  const editNote = (id: number, newTitle: string, newContent: string) => {
    setNotes(
      notes.map((n) =>
        n.id === id ? { ...n, title: newTitle, content: newContent } : n
      )
    )
  }

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  )

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

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button className="clear-search" onClick={() => setSearch('')}>
            ✕
          </button>
        )}
      </div>

      <div className="notes-grid">
        {filteredNotes.length === 0 ? (
          <div className="empty">
            {search ? 'No results found' : 'No notes yet'}
          </div>
        ) : (
          filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={deleteNote}
              onEdit={editNote}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default App
