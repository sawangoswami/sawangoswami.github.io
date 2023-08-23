import {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';

function App() {
    const [characters, setCharacters] = useState([])
    const [query, setQuery] = useState("")


    useEffect(() => {
        const fetchData = async () => {
            
            try {
                
             const {data} = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`)
               setCharacters(data);
                console.log(data);
            } catch (error) {
                if(error.request.status === 404){
                setCharacters([]);
            }
            console.error(error);
            }
        }

        fetchData()
    }, [query]);

    

    return (
        <div className="App">
            <div className="search">
                <input type="text"
                       placeholder={"Search Character"}
                       className={"input"}
                       onChange={event => setQuery(event.target.value)}
                       value={query}
                />
            </div>
            <div className="results">

                {characters.map(character => (
                    <div>
                    <div>
                      
                       {character.phonetic}
                        {character.meanings.map(meaning =>(
                          <div style={{ padding:"20px 0 20px 20px" }}> 
                           { meaning.partOfSpeech }
                           <div className='syn-wrap'> 
                           {meaning.synonyms.map(syn => (
                            <div className=''>{syn}
                            </div>

                            ))}
                            </div>
                          
                           <div>
                           {meaning.definitions.map(def =>(
                             <div >{def.definition}</div>
                           ))} 
                           </div>
                    
                          </div>

                            ))}

                        <div>
                        
                         {character.phonetics.map(pronun =>(

                          pronun.audio ==='' ?  '' : <audio controls controlsList="nodownload noplaybackrate" src={pronun.audio} > audio</audio>

                            ))}

                        </div>
                      </div>
                     </div>


                    
                ))}
            </div>

        </div>
    );
}

export default App;


 <input type="search" value="search" onClick =  { ()=>setQuery(input) }  />
