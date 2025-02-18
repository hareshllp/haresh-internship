import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import {forgotPassword} from "../services/auth.service";

type Props = {};


function validationSchema() {
  return Yup.object().shape({
    email: Yup.string().required("This field is required!")
  });
}



const ForgotPassword = (props: Props) => {
  
  
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  
  const navigate = useNavigate();
 
  const handleForgotPassword = (formValue: { email: string }) => {
    const { email } = formValue;
    setLoading(true);

    forgotPassword(email).then(
      response => {
        let token = response.data.token; 
        alert(token);
        //redirect to reset password screen
        navigate('/resetpassword?token='+token);
      },
      error => {
        let messageData = error.response.data.message;
        const resMessage = typeof (messageData) === 'object' ? messageData[0] : messageData;
        setLoading(false);
        setMessage(resMessage);
      }
    );
  }

  const handelCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate('/login');
  }

 
    return (
      <>
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="card-container">
                <Formik
                  initialValues={{email:""}}
                  validationSchema={validationSchema()}
                  onSubmit={handleForgotPassword}
                >
                  <Form>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Field name="email" type="text" className="form-control" />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <div className="form-group">
                      <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-3">
                          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading && (
                              <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Submit</span>
                          </button>
                        </div>
                        <div className="col-md-3">
                          <button onClick={handelCancel} className="btn btn-warning btn-block">Back To Login</button>
                        </div>
                        <div className="col-md-1"></div>
                      </div>
                    </div>

                    {message && (
                      <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                          {message}
                        </div>
                      </div>
                    )}
                  </Form>
                </Formik>
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
        
      </>
    );
  
}

export default ForgotPassword;