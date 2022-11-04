import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import mode from "../../services/indexedDB"
const Bookmark = () => {
  const [dbData, setdbData] = useState([])
  useEffect(() => {
    mode().then((store) => {
      store.getAlldb().onsuccess = (event) => {
        setdbData(event.target.result)
      }
    })
  }, [])
  return (
    <div style={{
      color: 'white'
    }} >
      Boookmark contents list
      {dbData.map((e) => {
        return (
          <div>
            <Link to={"/" + e.id}>
              {e.animeName}
            </Link>
          </div>
        )
      })}
    </div >
  )
}

export default Bookmark
