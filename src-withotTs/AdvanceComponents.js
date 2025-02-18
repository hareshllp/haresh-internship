import './App.css';
import React from 'react';


let UserData = {
  'name': 'John Williamson',
  'role': 'Admin'
}

const LoggedInUserContext = React.createContext(UserData);



export class DropdownAccessibility extends React.Component {

  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.toggleContainer = React.createRef();

  }

  // componentDidMount() {
  //   window.addEventListener('click', this.onClickOutsideHandler);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('click', this.onClickOutsideHandler);
  // }

  handleBlur = () => {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
    }
  }

  onFocusHandler = () => {
    if (!this.state.isOpen) {
      this.setState({ isOpen: true });
    }
  }

  onClickOutsideHandler = (event) => {
    if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }

  render() {

    return (
      <div ref={this.toggleContainer} onBlur={this.handleBlur} onFocus={this.onFocusHandler}>
        <button onClick={this.onClickHandler}>Select an option</button>
        {this.state.isOpen && (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        )}
      </div>
    );
  }


}

class UserInfo extends React.Component {

  render() {
    let userinfo = this.context;

    return (
      <div>
        <h1>User is {userinfo.name}</h1>
        <h1>Role is {userinfo.role}</h1>
      </div>
    );
  }
}
UserInfo.contextType = LoggedInUserContext;


export class LoggedInProfile extends React.Component {
  render() {

    return (
      <UserInfo />
    );
  }
}

const themes = {
  yellow: {
    color: '#F7F628',
    text: 'Yellow'
  },
  green: {
    color: '#246224',
    text: 'Green'
  }
};
const ThemeContext = React.createContext(themes.green);

class ThemeBody extends React.Component {

  render() {
    let theme = this.context;
    return (
      <React.Fragment>
        <b>Current Theme is {theme.text}</b>
        <h1 style={{ backgroundColor: theme.color }}>This is Change according to theme</h1>
      </React.Fragment>
    );
  }
}
ThemeBody.contextType = ThemeContext;

class ThemeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.green,
    };
  }


  handleChangeTheme = () => {
    this.setState(state => ({
      theme: state.theme === themes.yellow ? themes.green : themes.yellow,
    }));
  }

  render() {
    return (
      <ThemeContext.Provider value={this.state.theme}>
        <button onClick={this.handleChangeTheme}>Change Theme</button>
        <ThemeBody />
      </ThemeContext.Provider>
    );
  };
}
ThemeButton.contextType = ThemeContext;


export class ThemeManagement extends React.Component {

  render() {

    return (
      <React.Fragment>
        <ThemeButton />
      </React.Fragment>
    );
  }
}


const DataSource = {
  comments : [
    {"id":1,"comment":"Hi","created_at":"098098"},
    {"id":2,"comment":"Hello","created_at":"098098"},
    {"id":3,"comment":"Nice Good","created_at":"098098"}
  ],
  posts : [
    {"id":1,"title":"This is latest Post 1","created_at":"098098"},
    {"id":2,"title":"This is latest Post 2","created_at":"098098"},
    {"id":3,"title":"This is latest Post 3","created_at":"098098"}
  ]
}

function Comment(props){
  let commentData = props.commentData;
  return (
   <>
    <li>{commentData.comment}</li> 
   </>  
  );  
}

function Post(props){
  let postData = props.postData;
  return (
   <>
    <p>{postData.title}</p> 
   </>  
  );  
}

class CommentList extends React.Component {
  // constructor(props) {
  //   super(props);
    
  //   this.state = {
  //     // "DataSource" is some global data source
  //     comments: DataSource.comments
  //   };
  // }
  
  // componentDidMount() {
  //   // Subscribe to changes
  //   this.handleChange();
  // }

  // componentWillUnmount() {
  //   // Clean up listener
  //   this.handleChange();
  // }


  // handleChange = () => {
  //   // Update component state whenever the data source changes
  //   this.setState({
  //     comments: DataSource.comments
  //   });
  // }

  render() {
    
    let comments = this.state.comments; 
   
    return (
      <div>
        <ul>
          {comments.map((oneComment) => (
            <Comment commentData={oneComment} key={oneComment.id} />
          ))}
        </ul>
      </div>
    );
  }
}


class ShowPost extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      // "DataSource" is some global data source
      posts: DataSource.posts
    };
  }
  
  // handleChange = () => {    // Update component state whenever the data source changes
  //   this.setState({ 
  //     posts: DataSource.posts
  //   });
  // }

  
  render() {

    const post_id = 2;
    let postData =  this.state.posts.find((e,i) => e.id === post_id); 
   
    return (
      <div>
        <Post postData={postData} key={post_id} />
      </div>
    );
  }
}


const CommentListHOC = byHOCComponent(
  CommentList,
  (DataSource) => DataSource.comments
);

const PostHOC = byHOCComponent(
  ShowPost,
  (DataSource, props) => DataSource.posts
);



function byHOCComponent(WrappedComponent,DataMaster){

  return class extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        data: DataMaster(DataSource, props)
      };
    }

    handleChange = () => {
      this.setState({
        data: DataMaster(DataSource, this.props)
      });
    }

    render() {
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }

  }

}



export class HigherOrderComponents extends React.Component {

  render() {

    return (
      <React.Fragment>
        <CommentListHOC />
        <PostHOC  pid="1" />
      </React.Fragment>
    );
  }
}



function NameInput(props) {
  return (
    <p>
      <input value={props.name} onChange={props.handleChange} />
      <br />
      My name is {props.name}.
    </p>
  );
}


export function PhotoStory(props){
  return (
      <h2>This is {props.type} Story</h2>
  );
}

export function VideoStory(props){
  return (
      <h2>This is {props.type} Story</h2>
  );
}



export class DisplayInputName extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name: props.name
    };
  }
  
  handleChange = (e) => {
    this.setState({ name: e.target.value});
  }
  render() {
    return (
      <React.Fragment>
        <NameInput name={this.state.name} handleChange={this.handleChange} />
        
        
      </React.Fragment>

    );
  }
}



























