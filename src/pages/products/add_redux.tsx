import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { RootState } from "redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addProductClosed, editProduct, storeProduct } from "redux/slices/products.slice";

import { v4 as uuid } from 'uuid';
import { toast } from "react-toastify";

import  {productTypes} from "redux/slices/products.slice"

type Props = {};


const productvalidationSchema = () => {
  return Yup.object().shape({
    productCategory: Yup.string().required("This field is required!"),
    productName: Yup.string().required("This field is required!"),
    description: Yup.string().required("This field is required!"),
    manufacturer: Yup.string().required("This field is required!"),
    price: Yup.string()
      .matches(
        /^\d{0,8}(\.\d{1,4})?$/,
        "Please enter valid price"
      )
      .required("This field is required!")
  });
}

const defaultProductData:productTypes = {
  id:"",
  productCategory: "",
  productName: "",
  description: "",
  manufacturer: "",
  price: "" 
}


const NewProduct = (props: Props) => {

  

  const dispatch = useDispatch();
  const [message, setMessage] = useState<string>('');
  const [successful, setSuccessful] = useState<boolean>(false);
  const [product, setProduct] = useState<productTypes>(defaultProductData);
  const [popupStyle, setPopupStyle] = useState<{display:string}>({display:'none'});
  
  const { data, addProduct } = useSelector((state: RootState) => state.products);

  useEffect(()=>{
    
    if(addProduct.popupOpened){
      setPopupStyle({display:'block'});
    }else{
      setPopupStyle({display:'none'});  
    }
    console.log(`edit Mode:${addProduct.isEditMode}`)

    if(addProduct.isEditMode){
      let currentProduct = data.filter((data) => data.id === addProduct.productId);   
      if(currentProduct.length > 0){
        setProduct(currentProduct[0]);  
      }  
      // console.log(product);    
    }else{
      setProduct(defaultProductData);  
    }

  },[addProduct.popupOpened,addProduct.isEditMode]);


  const handleProductSubmit = (formValue: {
    id:string
    productCategory: string,
    productName: string,
    description: string,
    manufacturer: string,
    price: string
  },resetForm:()=>void) => {

    console.log(' form submitted for add product');
    console.log(formValue);
    
    //save product data into state
    
    let successMsg;
    if(formValue.id === ""){
      let ProductData = {...formValue,id: uuid().slice(0,8)};
      dispatch(storeProduct(ProductData));
      successMsg = "Product added successfully";
    }else{
      dispatch(editProduct(formValue));
      successMsg = "Product updated successfully";
    }
    dispatch(addProductClosed());
    //close popup
    resetForm();
    toast(successMsg);
  }

  return (
    <>
      <div className={ addProduct.popupOpened ? "modal fade show" : "modal fade"}  id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={popupStyle}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Create a New Product</h5>
              <button type="button" className="close" onClick={()=>{dispatch(addProductClosed())}} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="card-container">

                <Formik
                  enableReinitialize={true}
                  initialValues={product}
                  validationSchema={productvalidationSchema}
                  onSubmit={ (values, { resetForm }) => handleProductSubmit(values,resetForm) }

                >
                 { props => ( 

                  <Form >
                    <Field name="id" type="hidden" className="form-control" />
                    <div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="first_name"> Select Category </label>
                            <Field as="select" name="productCategory" className="custom-select" onChange={props.handleChange('productCategory')}>
                              <option value="">-- Select Category --</option>
                              <option value="electronics">Electronics</option>
                              <option value="homeAppliances">Home Appliances</option>
                              <option value="clothes">Clothes</option>
                              <option value="sport">Sport</option>
                              <option value="furniture">Furniture</option>
                            </Field>
                            <ErrorMessage name="productCategory"
                              component="div"
                              className="alert alert-danger"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="productName"> Product Name </label>
                            <Field name="productName" type="text" className="form-control" />
                            <ErrorMessage
                              name="productName"
                              component="div"
                              className="alert alert-danger"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="description"> Description </label>
                        <Field as="textarea" name="description" className="form-control"  />
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="alert alert-danger"
                        />
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="manufacturer"> Manufacturer </label>
                            <Field name="manufacturer" type="text" className="form-control" />
                            <ErrorMessage
                              name="manufacturer"
                              component="div"
                              className="alert alert-danger"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="price"> Price </label>
                            <Field name="price" type="text" className="form-control" />
                            <ErrorMessage
                              name="price"
                              component="div"
                              className="alert alert-danger"
                            />
                          </div>
                        </div>
                      </div>


                      <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                      </div>
                    </div>

                    {message && (
                      <div className="form-group">
                        <div
                          className={
                            successful ? "alert alert-success" : "alert alert-danger"
                          }
                          role="alert"
                        >
                          {message}
                        </div>
                      </div>
                    )}
                  </Form>
                 )}

                </Formik>
              </div>

            </div>
          </div>
        </div>
      </div>

    </>
  );

}

export default NewProduct;