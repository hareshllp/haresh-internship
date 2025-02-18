import React, { useState, useEffect, useReducer, useTransition} from 'react';
import './index.css';


function ClickCountButton(props){

  const [clickCount,setClickCount] = useState(0);
  
  useEffect(() => {
    
    // Update the document title using the browser API
    document.title = `You clicked ${clickCount} times and title is ${props.title}`;
    
    return () => {
      alert(`Effect Unmount Called`);  
    }
  });
  // },[props.title]);

  // const unMountIt = () => {
  //   return null;    
  // }

  return (
    <div>
      <p>You clicked {clickCount} times</p>
      
      {clickCount < 3  ? <button onClick={() => setClickCount(clickCount + 1)} >
        Click Count Button
      </button> : null}
    </div>
  );
}

ClickCountButton.defaultProps = {
  title:'Click Buttton'
}




function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, {count: 0});
  return (
    <>
      Count: {state.count}
      {state.count > 0 && <button onClick={() => dispatch({type: 'decrement'})}>-</button>}  
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}


function FileUploadForm(){
  const [fileName,setFileName] = useState(''); 
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);

  function handleFileUpload(e) {
    setFileName(e.target.files[0].name);

  }

  function handleClick() {
    startTransition(() => {
      for(let i=0 ; i <= 10000 ; i++){
        setCount(c => c + 1);
      }
    })
  }

  return (
    <form method='POST' encType='multipart/form-data' onSubmit={(e) => e.preventDefault()}>
      
      <p>You have uploaded file with name:  {fileName}</p>
      <input type={'file'} onChange={handleFileUpload}/>

      <div>
        {isPending && <h3>Loading...</h3>}
        <button onClick={handleClick}>Click to increase count  {count}</button>
      </div>


    </form>
  );

}





export default class HooksDemo extends React.Component {

  render() {
    return (
      <React.StrictMode>
        <ClickCountButton />
        <Counter />
        <FileUploadForm />
      </React.StrictMode>
    );
  }

}


