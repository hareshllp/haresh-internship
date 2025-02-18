import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import {changePassword} from "../services/user.service";
import Layout from "components/layout";

type Props = {};

type CPflags = {
  loading: boolean,
  message: string,
  successful: boolean
};

type ChangePasswordData = {
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
}


function validationSchema(){
  return Yup.object().shape({
    currentPassword: Yup.string().required("This field is required!"),
    newPassword: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val: any) =>
          val &&
          val.toString().length >= 6 &&
          val.toString().length <= 40
      )
      .required("This field is required!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        "Password must have One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirmPassword: Yup.string()
                  .oneOf([Yup.ref('newPassword'), null], 'Password and Confirm Password must be same')            
                  .required("This field is required!"),
  });
}


const ChangePassword = (props:Props) => {
  
 
  const defaultCPflags ={
    loading: false,
    message: "",
    successful: false   
  };

  
  const [flags ,setFlags] = useState<CPflags>(defaultCPflags);
  
  const handleChangePassword = (formValue: ChangePasswordData) => {
    
    setFlags({...flags,loading:true});

    changePassword(
      formValue.currentPassword,
      formValue.newPassword,
      formValue.confirmPassword
    ).then(
      response => {
        console.log(response);
        setFlags({...flags,loading:false,successful:true,message:"Password Changed Successfully"});
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          setFlags({...flags,loading:false,successful:false,message:resMessage});
      }
    );
  }

  return (
      <>
        <Layout>
        <div className="row">
          <div className="col-md-2"><div style={{ width: "100%" }}></div></div>
          <div className="col-md-8">
            <div className="card-container">
            
              <Formik
                initialValues={{currentPassword: "",newPassword: "",confirmPassword: ""}}
                validationSchema={validationSchema()}
                onSubmit={handleChangePassword}
              >
                <Form>
                  <div>
                  
                    <div className="form-group">
                      <label htmlFor="currentPassword"> Current Password </label>
                      <Field name="currentPassword" type="password" className="form-control" />
                      <ErrorMessage
                        name="currentPassword"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="newPassword"> New Password </label>
                      <Field name="newPassword" type="password" className="form-control" />
                      <ErrorMessage
                        name="newPassword"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="confirmPassword"> Confirm Password </label>
                      <Field name="confirmPassword" type="password" className="form-control" />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <div className="form-group">
                      <button type="submit" className="btn btn-primary btn-block" disabled={flags.loading}> {flags.loading  && (<span className="spinner-border spinner-border-sm"></span>)} Submit</button>
                    </div>
                  </div>

                  {flags.message !== "" && (
                    <div className="form-group">
                      <div
                        className={
                          flags.successful ? "alert alert-success" : "alert alert-danger"
                        }
                        role="alert"
                      >
                        {flags.message}
                      </div>
                    </div>
                  )}
                </Form>
              </Formik>
            </div>
          </div>
        </div>
        </Layout>
      </>
  );
  
}

export default ChangePassword;