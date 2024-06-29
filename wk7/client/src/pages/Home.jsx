import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import SingleNote from '../components/SingleNote';
import { Link } from 'react-router-dom';

export default function Home(){
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/notes")
            .then(response => response.json())
            .then(data => setNotes(data))
            .catch(error => console.error("Something went wrong: ", error));
    }, [])

    function handleDelete(id){
        fetch(`http://localhost:3000/notes/${id}`, {method: 'DELETE'})
            .then(response => response.json())
            .then(data =>{
                if(alert(data.res)){
                    setNotes(notes => notes.filter(note => note.id !== id));
                }
                location.reload();
            })
            .catch(error => console.error("Something went wrong: ", error));
    }
    
    return(
        <div className="home">
            <NavBar />
            <h1>YANT</h1>
            <main>
                <ul>
                    {notes.map(note => <SingleNote className="notes" key={note.id} note={note} onDelete={() => handleDelete(note.id)}/>)}
                </ul>

                <Link to='/new-note' className='btn'>Add a new Note</Link>
            </main>
        </div>
    )
}