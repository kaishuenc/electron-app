import { useRef } from "react"

interface Props {
  title: string
  content: string
  setTitle: (v: string) => void
  setContent: (v: string) => void
  addNote: () => void
}

function NoteInput({ title, content, setTitle, setContent, addNote }: Props) {
  const titleRef = useRef<HTMLInputElement>(null)

  return (
    <div className="input-card">
      <input
        ref={titleRef}
        className="input-title"
        placeholder="Note title..."
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        className="input-content"
        placeholder="Write something..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <div className="input-footer">
        <button className="btn-add" onClick={addNote}>
          Add Note
        </button>
      </div>
    </div>
  )
}

export default NoteInput