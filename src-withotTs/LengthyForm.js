import React, { useState } from 'react';
import './index.css';


let fields = [];
for (let i = 0; i < 100; i++) {
  let unit = { name: `field${i}`, val: "" };
  fields.push(unit);
}

const initalState = fields.reduce(
  (acc, next) => ({ ...acc, [next.name]: next.val }),
  {}
);

function TextInput(props) {
  let label = `Field ${props.sr_no + 1}`;
  return (
    <div>
      <label>
        {label}
        <input type="text" name={props.name} value={props.val} onChange={props.onChange} />
      </label>
    </div>
  );
}

function BuildForm() {
  const [formData, setFormData] = useState(initalState);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let Formdata = "";
    fields.map((elem,i) => {
      Formdata += `Field ${i+1} have value is ${formData[elem.name]} \n`;  
    });
    console.log(Formdata); 
  }

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        {fields.map((elem, i) => (
          <TextInput key={elem.name} sr_no={i} name={elem.name} value={formData[elem.name]} onChange={(e) => handleChange(e.target.name, e.target.value)} />
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}


export default class LengthyForm extends React.Component {

  render() {
    return (
      <React.StrictMode>
        <BuildForm />
      </React.StrictMode>
    );
  }

}


