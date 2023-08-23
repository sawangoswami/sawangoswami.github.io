import {useEffect, useState,} from 'react';
import './App.css';
import axios from 'axios';

function App() {
    const [characters, setCharacters] = useState([])
    const [query, setQuery] = useState("");
    // const prevChar = useRef(characters);
    
    useEffect(() => {
        const fetchData = async () => {
         try {
           const {data} = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`)
               setCharacters(data);
               
            } catch (error) {
                if(error.request.status === 404){
                 
                  setCharacters([]);
            }
            
            }
        }

        fetchData()
    }, [query]);
    


    function handleSubmit(event){
          event.stopPropagation();
        event.preventDefault();
        let input = document.getElementById('word').value;
        setQuery(input);

}
// let count = 0;


   return (

       <div className="App">
            <div className="search">
            <form  onSubmit =   { handleSubmit }>
                <input type="text"
                       id = 'word'
                       placeholder={"Search Character"}
                       className={"input"}

                      />

               <input  className =" submit" type="submit" value="Search"  />
               
          </form>
            </div>
            <div className="results">
                      
                    {characters.map((character,index) => (
                       <div className="ajax"  >
                       <div>{character.word}</div>
                       <div>{character.phonetic}</div>
                       {character.meanings.map( meaning => ( 
                        <div> 
                        <div className='syn'>{meaning.synonyms[0] ? <div> <div  className="italic">synonyms</div><div>{meaning.synonyms[0]}</div></div> : ""}</div>
                        <div className='ant'>{meaning.antonyms[0]  ?  <div> <div  className="italic">antonyms</div><div>{meaning.antonyms[0]}</div></div> : ""}</div>
                       <div className='meaning'>{ meaning.partOfSpeech }</div>
                         {meaning.definitions.map(def => (
                           <div className = 'def' > {def.definition } </div>
                            ))} 
                         </div>
                         ))}
                      
                       </div>

                      ))}
                  
                   {console.log(characters)}
                  </div>
                 <div className='srcUrl' > 
                  <a href = {characters[0] ? (characters[0].sourceUrls[0]) : '' } onClick = {characters[0] ? (event)=> {event.stopPropagation(); alert('click')} : (event)=>{ event.preventDefault()} } > {characters[0] ? "further Reading" : "input is wrong/ word does not exist/wikipedia deosn't contain this page" }</a>
                  </div>
                  
            </div>
            

       
    );
}

export default App;
