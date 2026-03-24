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
}

function NoteCard({ note, onDelete }: Props) {
  return (
    <div className="note-card" style={{ background: note.color }}>
      <h3 className="note-title">{note.title}</h3>

      <span className="note-date">
        {format(note.date, "MMM d, HH:mm")}
      </span>

      <p className="note-content">{note.content}</p>

      <div className="note-actions">
        <button className="btn-delete" onClick={() => onDelete(note.id)}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default NoteCard