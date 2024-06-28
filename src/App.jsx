import { useCallback, useEffect, useRef, useState } from "react"
import { IoCopyOutline } from "react-icons/io5";

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [scAllowed, setScAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if (numberAllowed) {
      str += "0123456789"
    }
    if (scAllowed) {
      str += "!@#$%^&*_-+="
    }

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);

    }

    setPassword(pass);


  }, [length, numberAllowed, scAllowed, setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, length);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, scAllowed])

  return (
    <>

      <div className="w-full h-full max-w-xl mx-auto shadow-md rounded-lg  px-4 py-3 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center">Password Generator</h1>
        <div className="flex shadow rounded-md overflow-hidden mb-4">
          <input type="text" value={password} className="outline-none w-full px-3 py-1 my-2 rounded-md" readOnly ref={passwordRef} />
          <button className="m-3 text-white bg-slate-600 outline-none shrink-0  px-3 py-3 rounded-full hover:bg-slate-400 duration-500" onClick={copyPassword}><IoCopyOutline /></button>
        </div>
        <div className="flex text-sm gap-x-5 justify-center">
          <div className="flex items-center gap-x-1">
            <input type="range" min={8} max={20} value={length} className="cursor-pointer" onChange={(e) => {
              setLength(e.target.value)
            }} />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={() => { setNumberAllowed((prev) => !prev) }} />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={scAllowed} id="scInput" onChange={() => { setScAllowed((prev) => !prev) }} />
            <label htmlFor="scInput">Special Characters</label>
          </div>
        </div>
        <div className="flex items-center justify-center mt-7">
          <button className="bg-slate-600 py-2 px-2 text-white rounded-md  hover:bg-slate-400 duration-500" onClick={passwordGenerator}>Generate New Password</button>
        </div>
      </div>

      <footer className="w-full max-w-xl mx-auto shadow-md rounded-lg px-4 py-3 mt-auto">
        <h2 className="text-white text-center">Made By Jatin Chhabra</h2>
      </footer>
    </>
  )
}

export default App
