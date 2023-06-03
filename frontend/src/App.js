import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [check, setCheck] = useState(0);

  const submithandler = async (event) => {
    event.preventDefault();
    const numbers = { num1: num1, num2: num2 };
    await axios.post('http://localhost:4000/store', { numbers }).then(res => {
      alert(res.data);
    }).catch(err => {
      alert(err.data);
    })
  }

  const getdata = async () => {
    await axios.get('http://localhost:4000/retrieve').then(res => {
      const numbers = res.data;
      setNum1(numbers.num1);
      setNum2(numbers.num2);
      setCheck(1);
    }).catch(err => {
      alert(err.data);
    })
  }

  useEffect(() => {
    getdata();
  }, [])

  return (
    check ?
      <div className="App">
        <header className="App-header">
          <form onSubmit={submithandler}>
            <p>
              <input type='number' id='num1' value={num1} onChange={(event) => setNum1(event.target.value)}></input>
            </p>
            <p>
              <input type='number' id='num2' value={num2} onChange={(event) => setNum2(event.target.value)}></input>
            </p>
            <div sx={{ textColor: "white" }} id='Ans'>
              Sum of two numbers = {Number(num1) + Number(num2)}
            </div>
            <button type='submit'>Submit</button>
          </form>
        </header>
      </div>
      : <></>);
}

export default App;
