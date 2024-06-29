import { useState } from "react"
import NavBar from "../components/NavBar"
import { useNavigate } from 'react-router-dom';

export default function NewNote() {
    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`http://localhost:3000/notes`, {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({ content: inputValue })
        })
            .then(response => response.json())
            .then(data => {
                alert(data.res)
                navigate("/");
            })
            .catch(error => console.error("Something went wrong: ", error));
    }
    
    return (
        <div className="newNote">
            <NavBar />
            <form onSubmit={handleSubmit}>
                <input type="text" name="content" onChange={e => setInputValue(e.target.value)} placeholder="Enter the content for the new note!"/>
                <button type="submit" className="btn">Save Note</button>
            </form>
        </div>
    )
}