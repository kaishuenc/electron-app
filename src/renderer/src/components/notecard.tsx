import { useState } from "react"
import { format } from "date-fns"

interface Note {
  id: number
  title: string
  content: string
  date: number
  color: string
}

interface Props {
  note: Note
  onDelete: (id: number) => void
  onEdit: (id: number, title: string, content: string) => void
}

function NoteCard({ note, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)

  return (
    <div className="note-card" style={{ background: note.color }}>
      {isEditing ? (
        <>
          <input
            className="edit-title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <textarea
            className="edit-content"
            value={content}
            onChange={e => setContent(e.target.value)}
          />

          <div className="note-actions">
            <button
              className="btn-save"
              onClick={() => {
                onEdit(note.id, title, content)
                setIsEditing(false)
              }}
            >
              Save
            </button>

            <button
              className="btn-cancel"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="note-title">{note.title}</h3>

          <span className="note-date">
            {format(note.date, "MMM d, HH:mm")}
          </span>

          <p className="note-content">{note.content}</p>

          <div className="note-actions">
            <button className="btn-edit" onClick={() => setIsEditing(true)}>
              Edit
            </button>

            <button className="btn-delete" onClick={() => onDelete(note.id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default NoteCard