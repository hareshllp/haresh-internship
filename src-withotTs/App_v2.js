import './App.css';
import React from 'react';



// const Timer = ()=> {
  
//     return (
//       <div className="Timer">
//         <h3>Time Now :</h3> {new Date().toLocaleTimeString()}
//       </div>
//     ) 
// }

function LoginButton(props){
  return (
    <a href={props.href}>Login</a>
  );    
}

function LogoutButton(props){
  return (
    <form method='POST' action={props.href}>
      <input type="submit" name="logout" value="Log Off"></input>  
    </form>
  );    
}

function ToggleLoginButton(props){
  return (
    <div>
      <button onClick={props.onClick} style={{'backgroundColor':'blue'}} >Toggle Login</button>  
    </div>
  );
}

class Timer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      date: new Date()
    }  
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
      return (
          <div className="Timer">
          <h3>Time Now : {this.state.date.toLocaleTimeString()}</h3> 
         </div>
      );
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

}



class LoginControl extends React.Component {

 

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }



  handleToggleLogin = () => {
    this.setState( prevState=> ({
      isLoggedIn : !prevState.isLoggedIn
    }));      
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    const loginUrl = "http://localhost/demo/login";
    const logoutUrl = "http://localhost/demo/logout";


    let button = <LoginButton href={loginUrl} />;
    if(isLoggedIn){
      button = <LogoutButton href={logoutUrl} />;  
    }
    return (
      <React.Fragment>
        <div>
          {button}
        </div>
        <ToggleLoginButton onClick={this.handleToggleLogin}/>
        {this.props.children}
      </React.Fragment>
    );

  }
}
  

function Mails(props){
  return (
    <div>
      <h3>Hello Dude ! Mails</h3>
      {props.mails.length > 0 && 
          <p>You have {props.mails.length} unread mails.</p>
      }
    </div>
  );
}

function Messages(props){
  return (
    <div>
      <h3>Hello Dude ! Messages</h3>
      {props.messages.length > 0 && 
          <p>You have {props.messages.length} unread messages.</p>
      }
    </div>
  );
}


class DashboardCounts extends React.Component{
    
    render() {
      
      const mails = ['email1','email2','email3'];
      const messages = [];

      return (
        <React.Fragment>
          <Mails mails={mails} />  
          <Messages messages={messages}/>
        </React.Fragment>
      );
  
    }

}

function ResultRowTable(props){
  let row = props.resultRow;
  let percent = ((row.maths+row.physics+row.chemistry) / 3).toFixed(2);
    return (  
      <tr>
        <td>{row.id}</td>
        <td>{row.name}</td>
        <td>{row.maths}</td>
        <td>{row.physics}</td>
        <td>{row.chemistry}</td>
        <td>{percent}</td>
      </tr>
    );
}



function ResultTable(props){
  let resultData = props.resultData;
  
  // console.log(resultData);
  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Maths</th>
            <th>Physics</th>
            <th>Chemistry</th>
            <th>Percent(%)</th>
          </tr>
        </thead>
        <tbody>
          {
            resultData.map((userResult) =>
              <ResultRowTable resultRow={userResult} key={userResult.id} />
            )
          }
        </tbody>
      </table> 
    </div>
  );

}



class UsersResult extends React.Component{
    
  render() {
    const examResults = [
      {id: 1, name: 'Pradip Vaghela', maths: 84, physics:80,chemistry:75},
      {id: 2, name: 'Ramesh Jani', maths: 90, physics:90,chemistry:92},
      {id: 3, name: 'Kartik Panera', maths: 95, physics:75,chemistry:70},
    ];
    return (
      <React.Fragment>
        <ResultTable resultData={examResults} />  
      </React.Fragment>
    );

  }
}


class EntryForm extends React.Component{
  
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password:'',
      interests:[]
    };

  }

  handleChange = (event) => {
    let fieldVal = event.target.value;
    let field = event.target.name;

    if(field === 'email'){
      this.setState({
        email: fieldVal 
      });
    }
    if(field === 'password'){
      this.setState({
        password: fieldVal 
      });
    }
    if(field === 'interests'){
      let options = event.target.options;
      let interestsData = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          interestsData.push(options[i].value);
        }
      }
      this.setState({
        interests: interestsData 
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    let output = 'Email: '+this.state.email;
        output += '  ---  ';
        output += 'Password: '+this.state.password;
        output += '  ---  ';
        output += 'Interests: '+ this.state.interests.join(', ') ;

        
    alert(output);    
  }  

  render() {
    return (
      <div>
          <form onSubmit={this.handleSubmit}>
            <label> Email:
              <input type="email" value={this.state.email} onChange={this.handleChange} name="email" />
            </label>
            <label> Password:
              <input type="password" value={this.state.password} onChange={this.handleChange} field='password' name='password'/>
            </label>

            <select name='interests'  onChange={this.handleChange} multiple={true}>
              <option value="reading">Reading</option>
              <option value="development">Development</option>
              <option value="travelling">Travelling</option>
              <option value="gaming">Gaming</option>
              <option value="yoga">Yoga</option>
            </select>

            <input type="submit" value="Submit" />
          </form>
      </div>
    );
  }
}

function DisplayGrade(props){
  if(props.grade > 35){
    return <h4> Congratulations ! You are eligible</h4>
  }
  return <h4> Oops ! You are not eligible</h4>
}


class CheckPassingGrade extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      grade: 10,
      isSubmitted : false
    };

  }

  handleChange = (event) => {
    let fieldVal = event.target.value;
    this.setState({
        grade: fieldVal,
        isSubmitted: false 
      });  
  }

  handleSubmit = (event) => {
    this.setState({
      isSubmitted: true 
    });
    event.preventDefault();
  }  

  render() {
    let gradeVal=this.state.grade;

    return (
      <div>
          <form onSubmit={this.handleSubmit}>
            <label> Enter Grade:
              <input type="number" value={this.state.grade} name="grade" onChange={this.handleChange} />
            </label>
            <input type="submit" value="Check" />
          </form>
          {this.state.isSubmitted && <DisplayGrade grade={gradeVal} />}
      </div>
    );
  }  
}



const scales = {
  'c' : 'Celcious',
  'f' : 'Fehrenhit'
};

class TemperatureField extends React.Component{
   
    handleChange = (e) => {
      this.props.onTempChange(e.target.value);
    }  

    render() {
      const temperature = this.props.temperature;
      const scale = this.props.scale;
      return (
        <fieldset>
          <legend>Enter temperature in {scales[scale]}:</legend>
          <input value={temperature}
                 onChange={this.handleChange} />
        </fieldset>
      );
    }
}



function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}


function convertTo(value,convert){
 
  const input = parseFloat(value);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}


class TemperatureCalculator extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        temperature: '', 
        scale: 'c'
      };
    }
  
  handleCelcious = (temperature) => {
    this.setState({
      scale: 'c',
      temperature : temperature 
    });    
  }

  handleFehrenhit = (temperature) => {
    this.setState({
      scale: 'f',
      temperature : temperature
    });    
  }  


  render() {

    let scale = this.state.scale;
    let temperature = this.state.temperature;

    const celcious = scale === 'f' ? convertTo(temperature,toCelsius) : temperature;      
    const fehrenhit = scale === 'c' ? convertTo(temperature,toFahrenheit) : temperature;      

    return (
      <div>
        <label> Temperature in {scales['c']}
          <TemperatureField scale="c" temperature={celcious} onTempChange={this.handleCelcious} />
        </label>
        <label> Temperature in {scales['f']}
          <TemperatureField scale="f" temperature={fehrenhit} onTempChange={this.handleFehrenhit} />
        </label>
      </div>
    );
  }

}




export {
  Timer, 
  LoginControl, 
  DashboardCounts, 
  UsersResult,
  EntryForm, 
  CheckPassingGrade,
  TemperatureCalculator
  
}























// class Comment extends React.Component{
  
//   constructor(props){
//       super(props);

//       this.state = {
//         user.avatarUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',

         
//       }

//       this.avatarUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';
//       this.name = "Demo User";
//       this.name = "Demo User";

//       this.rippleClickFunction=this.rippleClickFunction.bind(this);
//   }

//   render() {
//     return  (
//       <div className="Comment">
//         <div className="UserInfo">
//           <img className="Avatar"
//             src={this.props.author.avatarUrl}
//             alt={this.props.author.name}
//           />
//           <div className="UserInfo-name">
//             {this.props.author.name}
//           </div>
//         </div>
//         <div className="Comment-text">
//           {this.props.text}
//         </div>
//         <div className="Comment-date">
//           {formatDate(this.props.date)}
//         </div>
//       </div>
//     );
//   }
  
// }
