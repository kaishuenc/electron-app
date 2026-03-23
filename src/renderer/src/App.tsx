import { useState, useEffect, useRef } from "react"
import "./App.css"

interface Note {
  id: number
  title: string
  content: string
  date: string
  color: string
}

const COLORS = ["#fff9c4", "#fce4ec", "#e8f5e9", "#e3f2fd", "#f3e5f5", "#fff3e0"]

function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [search, setSearch] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editContent, setEditContent] = useState("")
  const titleRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem("notes-v2")
    if (saved) setNotes(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem("notes-v2", JSON.stringify(notes))
  }, [notes])

  const addNote = () => {
    if (!title.trim() || !content.trim()) return
    const color = COLORS[Math.floor(Math.random() * COLORS.length)]
    const newNote: Note = {
      id: Date.now(),
      title,
      content,
      date: new Date().toLocaleString("zh-CN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      color,
    }
    setNotes([newNote, ...notes])
    setTitle("")
    setContent("")
    titleRef.current?.focus()
  }

  const deleteNote = (id: number) => {
    setNotes(notes.filter(n => n.id !== id))
  }

  const startEdit = (note: Note) => {
    setEditingId(note.id)
    setEditTitle(note.title)
    setEditContent(note.content)
  }

  const saveEdit = (id: number) => {
    setNotes(notes.map(n => n.id === id ? { ...n, title: editTitle, content: editContent } : n))
    setEditingId(null)
  }

  const filtered = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="app">
      <header className="header">
        <div className="header-title">
          <h1>My Notes</h1>
        </div>
        <div className="note-count">{notes.length} notes</div>
      </header>

      <div className="input-card">
        <input
          ref={titleRef}
          className="input-title"
          placeholder="Note title..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => e.key === "Enter" && document.getElementById("note-textarea")?.focus()}
        />
        <textarea
          id="note-textarea"
          className="input-content"
          placeholder="Write something..."
          value={content}
          onChange={e => setContent(e.target.value)}
          onKeyDown={e => e.key === "Enter" && e.metaKey && addNote()}
        />
        <div className="input-footer">
          <span className="hint">⌘ + Enter to save</span>
          <button className="btn-add" onClick={addNote} disabled={!title.trim() || !content.trim()}>
            Add Note
          </button>
        </div>
      </div>

      {notes.length > 2 && (
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            placeholder="Search notes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && <button className="clear-search" onClick={() => setSearch("")}>✕</button>}
        </div>
      )}

      <div className="notes-grid">
        {filtered.length === 0 && (
          <div className="empty">
            {search ? "No results found" : "No notes yet — create your first one!"}
          </div>
        )}

        {filtered.map(note => (
          <div key={note.id} className="note-card" style={{ background: note.color }}>
            {editingId === note.id ? (
              <div className="edit-mode">
                <input
                  className="edit-title"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                />
                <textarea
                  className="edit-content"
                  value={editContent}
                  onChange={e => setEditContent(e.target.value)}
                />
                <div className="note-actions">
                  <button className="btn-save" onClick={() => saveEdit(note.id)}>Save</button>
                  <button className="btn-cancel" onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div className="note-header">
                  <h3 className="note-title">{note.title}</h3>
                  <span className="note-date">{note.date}</span>
                </div>
                <p className="note-content">{note.content}</p>
                <div className="note-actions">
                  <button className="btn-edit" onClick={() => startEdit(note)}>Edit</button>
                  <button className="btn-delete" onClick={() => deleteNote(note.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
