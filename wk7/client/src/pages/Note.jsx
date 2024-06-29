import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import NavBar from '../components/NavBar';
import DisplayImg from "../components/DisplayImg";

export default function Note() {
    const { id } = useParams();
    const [singleNote, setSingleNote] = useState(null);
    const [input, setInput] = useState(null);
    const [img, setImg] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/notes/${id}`)
            .then(response => response.json())
            .then(data => {
                setSingleNote(data[0]);
                setInput(data[0].text);
            })
            .catch(error => console.error("Something went wrong: ", error));
    }, [id])

    // console.log(singleNote);

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            fetch(`http://localhost:3000/notes/${id}/${input}`, { method: 'PATCH' })
                .then(response => response.json())
                .then(data => {
                    alert(data.res)
                })
                .catch(error => console.error("Something went wrong: ", error));
        }
    }

    function handleClick(e) {
        fetch(`http://localhost:3000/notes/${id}/${input}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                setImg(data.imgData)
            })
            .catch(error => console.error("Something went wrong: ", error));
    }

    return (
        <div className="notePage">
            <NavBar />
            <h1>Note ID: {singleNote ? singleNote.id : ""}</h1>
            <input type="text" value={input ? input : ""} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} />
            {img ? <DisplayImg imgData={img}clickHandler={() => handleClick()}/> : <h2 className="btn" onClick={handleClick}>Generate Image!</h2>}
        </div>
    )
}