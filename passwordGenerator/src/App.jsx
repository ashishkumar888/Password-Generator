import { useState, useCallback, useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  
   
  const [length, setLength] = useState(8)
  const[numberAllowed, setnumberAllowed] = useState(false)
  const[characterAllowed, setcharacterAllowed] = useState(false)
  const[password, setPassword] = useState('')


  const passwordRef=useRef(null)

  const passwordGenerator = useCallback(() =>{
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if(numberAllowed) str += '0123456789'
    if(characterAllowed) str += '!@#$%^&*()_+'

    for( let i=1; i<=length; i++){
      let char = Math.floor((Math.random() * str.length)+1)
      pass +=str.charAt(char)
    }

    setPassword(pass)


  }, [length, numberAllowed, characterAllowed, setPassword])

  const copyPassword = useCallback(() =>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,101)
    window.navigator.clipboard.writeText(passwordRef.current.value)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  },[length, numberAllowed, characterAllowed, passwordGenerator])
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md
    rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center
      my-3'>Password generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden
      mb-4'>
        <input type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passwordRef}
        />
        <button
        onClick={copyPassword}
        className='outline-none bg-blue-700 text-white
        px-3 py-0.5 shrink-0'
        >copy</button>

      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" 
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => setLength(e.target.value)}
          />
          <label>Length : {length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={numberAllowed}
          id='numberInput'
          onChange={()=>{
            setnumberAllowed((prev)=>!prev);
          }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={characterAllowed}
          id='characterInput'
          onChange={()=>{
            setcharacterAllowed((prev)=>!prev);
          }}
          />
          <label htmlFor="characterInput">Character</label>
          </div>
      </div>
    </div>
    
    </>
  )
}

export default App