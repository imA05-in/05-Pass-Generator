
import { use, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {

  const [length, setLength] = useState(8);
  const [allowSpChar, setAllowSpChar] = useState(false);
  const [allowNum, setAllowNum] = useState(false);
  const [password, setPassword] = useState("")

  function genPass(){
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(allowNum) str+= "1234567890";
    if(allowSpChar) str+= "!@#$%^&*()_-+=|\`{}[]:;'<>,.?/";
    let TempPass = ""

    for(let i = 0; i<length;i++){
      let random = Math.floor(Math.random() * str.length + 1)
      TempPass+= str.charAt(random)
    }
    setPassword(TempPass);
    
  }
  useEffect(genPass,[allowNum, allowSpChar, length])

  const passRef = useRef(null)


  const [showPass, setShowPass] = useState("text")
  const [showPassVar, setShowPassVar] = useState("hide")

  return (
    <>
        <div className="outer h-screen w-full flex flex-wrap flex-col items-center">
       <h1 className='text-3xl text-center mt-8 mb-3.5'>Password Generator</h1>

      <div className='bg-black p-6 pl-12 pr-12 rounded-xl flex flex-col justify-around h-66 w-200 items-center drop-shadow-gray-900 drop-shadow-2xl'>

       <div className="main overflow-auto">
        <input 
        type={showPass} 
        readOnly 
        value={password}
        ref={passRef}
        className='overflow-x-auto bg-gray-700 rounded-bl rounded-tl p-1.5 passholder passholder'/>
        <button
        className='btn active:scale-95 bg-gray-600 p-1.5 border-none'
        onClick={()=>{

          if(showPass === "text"){setShowPass("password");setShowPassVar("show")}
          if(showPass === "password"){setShowPass("text");setShowPassVar("hide")}

          }
          }
        >
          <div className='w-10 flex items-start'>
          {showPassVar}
          </div>
        </button>
        <button 
          className='bg-blue-600 pr-3 pl-3 rounded-br rounded-tr p-1.5  active:scale-95'
          onClick={(e)=>{
            window.navigator.clipboard.writeText(password);
            alert(`${password} : copied to clipboard`)
          }}

        >
          Copy
        </button>
       </div>

       <div className="bottom flex items-center w-full justify-around">
        <div className='flex'> 
        <input 
        type="range" 
        name="range" 
        id="range" 
        value={length} 
        className='mr-3' 
        min={8} 
        max={50}
        onChange={(e)=> setLength(e.target.value)}
        />
        <div
        className='flex w-25 justify-items-start'
        >
        <label htmlFor="range">Length: {length}</label>
        </div>
        </div>

        <div>
        <input 
        type="checkbox" 
        name="Characters" 
        id="Characters" 
        onClick={()=>{setAllowSpChar(!allowSpChar)}}
        />
        <label 
        htmlFor="Characters" 
        className='ml-1'>Characters</label>
        </div>
        
        <div>
        <input 
        type="checkbox" 
        name="Numbers" 
        onClick={()=>{setAllowNum(!allowNum)}}
        id="Numbers" 
        className='ml-6' 
        />
        <label htmlFor="Numbers" className='ml-1' >Numbers</label>
        </div>
       </div>
      </div>
    </div>
    
    </>
  )
}

export default App
