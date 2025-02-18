import './App.css';
import React, { Fragment } from 'react';





class FilterForm extends React.Component{

    constructor(props) {
      super(props);
      this.state = {
        keyword: '',
        is_in_stock_only:false
      };
    }

    handleChange = (event) => {
      const target = event.target;
      const value = target.name === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      
      this.setState({
        [name]: value
      });

    }


    handleSubmit = () => {

    }

    render() {
      
      return (
        <React.Fragment>
          <form onSubmit={this.handleSubmit()}>
            <label>
              Search
              <input type="text" name='keyword' value={this.state.keyword} onChange={this.handleChange} placeholder='Enter Keyword here' />
            </label>
            <div>
              <label>
                <input
                  name="is_in_stock_only"
                  type="checkbox"
                  checked={this.state.is_in_stock_only}
                  onChange={this.handleChange} />
                Only Show Products in stock?  
              </label>
            </div>
              
          </form>
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

function ProductsTable(props){
  let productsData = props.products;
  console.log('executed');
  
  // const productsConverted = [
  //   {
  //   "category":"Sporting Goods",
  //   "products":[{category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  //   {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  //   {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"}]
  //  },
  //  {
  //   "category":"Electronics",
  //   "products":[
  //   {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  //   {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"},
  //   {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"}]
  //  }
  // ];
  
  let categoryMappedData = [];
  productsData.forEach((el,i)=>{
    let cat = el.category;
    // if(i === 1){
    //   console.log(i);
    //   return false;
    // }else{
    //   console.log(i);
    // }
    let productObj = {
      "category": cat,
      "products":[] 
    }
    productObj['products'].push(el);
   
    if(categoryMappedData.length > 0){
      let findElem = categoryMappedData.find((e,i) => e.category === cat); 
      // console.log(findElem);
      if (findElem !== 'undefined' &&  findElem.length > 0) {
        categoryMappedData[i]['products'].push(el);
      }else{
        categoryMappedData.push(productObj);  
      }
    }else{
      // console.log('first');
      categoryMappedData.push(productObj);     
    }
  });
  // console.log(categoryMappedData);  


  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
            
        </tbody>
      </table> 
    </div>
  );

}



class FilterableProductTable extends React.Component{
    
 

  render() {
    const products = [
      {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
      {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
      {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
      {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
      {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"},
      {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"}
    ];
    return (
      <React.Fragment>
        <FilterForm />  
        <ProductsTable  products={products}/>  
      </React.Fragment>
    );

  }
}




export default FilterableProductTable

