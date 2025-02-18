

import './App.css';
import React ,{Suspense}  from 'react';

import {
  DropdownAccessibility,
  LoggedInProfile,
  ThemeManagement,
  HigherOrderComponents,
  DisplayInputName,
  PhotoStory,
  VideoStory
} from './AdvanceComponents';


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1 style={{color:'red'}}>You have error in following block</h1>;
    }

    return this.props.children; 
  }
}


const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // Correct! JSX type can be a capitalized variable.
  const SpecificStory = components[props.type];
  return <SpecificStory type={props.type}  />;
}

function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfFiveThings() {
  return (
    <Repeat numTimes={5}>
      {(index) => <div key={index}>This is item {index+1} in the list</div>}
    </Repeat>
  );
}

class DraggableImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    let mouse = {
      x: this.state.x,
      y: this.state.y
    }

    return (
      <div style={{ height: '30vh' }} onMouseMove={this.handleMouseMove}>
        <h1>Move the mouse around!</h1>
        <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
        <PickImage {...mouse}/>
      </div>
    );
  }
}


function PickImage(props){
  return (
    <img alt='Cat' src="https://i.pinimg.com/474x/05/23/a2/0523a2adeb72ac0835178cbba3d34b85.jpg" style={{ position: 'absolute', left: props.x, top: props.y,height:'50px',width:'50px' }} />
  ); 
}


class TextInputWithCallbackRef extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = null;

    this.setTextInputRef = element => {
      this.textInput = element;
    };

    this.focusTextInput = () => {
      // Focus the text input using the raw DOM API
      if (this.textInput) this.textInput.focus();
    };
  }

  render() {
    // Use the `ref` callback to store a reference to the text input DOM
    // element in an instance field (for example, this.textInput).
    return (
      <div>
        <input
          type="text"
          ref={this.setTextInputRef}
        />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}


class FormWithUC extends React.Component {

  constructor(props) {
    super(props);

    this.input = React.createRef();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    alert("Name: "+this.input.current.value);  
  }

  render() {
   
    return (
      <div >
        <form onSubmit={this.handleSubmit}>
          Name:
          <input type={'text'} ref={this.input} defaultValue="Default"/>
          <brick-flipbox class="demo">
            <div>front</div>
            <div>back</div>
          </brick-flipbox>
          <button type='submit'>submit</button>
        </form>
      </div>
    );
  }

}
FormWithUC.defaultProps = {
  name: 'Stranger'
};


export default class Advance extends React.Component{
 

  render() {
   
    return (
      <React.Fragment>
        <h1 class="section-main-title">Advanced Guides</h1>
        <h2 class="section-main-title">Accessibility</h2> 
        
        <Suspense fallback="<h4>Wait a moment...</h4>">
        <section>

        <ErrorBoundary>
          <DraggableImage />
        </ErrorBoundary>


          <DropdownAccessibility />
          <LoggedInProfile />
          <ErrorBoundary>
            <ThemeManagement />
          </ErrorBoundary>
          <ErrorBoundary>
            <h1 class="section-main-title">=== Higher Order Components ==</h1>
            <HigherOrderComponents />
          </ErrorBoundary>
          <DisplayInputName name="Haresh" />

           <React.Fragment>
            <h3>Refs and DOM</h3>
            <TextInputWithCallbackRef />

            <h3> User-Defined Components Must Be Capitalized </h3>
            <Story type='video' />
            <ListOfFiveThings />

            <h3>Uncontrolled Components</h3>
            <FormWithUC />


           </React.Fragment> 

        </section> 
        </Suspense>

        

      </React.Fragment>
    );
  }


}






















