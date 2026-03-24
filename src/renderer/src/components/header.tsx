interface Props {
  count: number
}

function Header({ count }: Props) {
  return (
    <header className="header">
      <div className="header-title">
        <h1>My Notes</h1>
      </div>
      <div className="note-count">{count} notes</div>
    </header>
  )
}

export default Header