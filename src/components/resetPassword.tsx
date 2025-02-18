import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import {resetPassword} from "../services/auth.service";

type Props = {};

function validationSchema() {
  return Yup.object().shape({
    new_password: Yup.string()
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
    confirm_password: Yup.string()
      .oneOf([Yup.ref('new_password'), null], 'Password and Confirm Password must be same')
      .required("This field is required!"),
  });
}


const ResetPassword = (props: Props) => {

  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  useEffect(()=>{
      setToken(searchParams.get("token")) ;
  },[]);
  
  //setToken('currentToken');
  
  const handleResetPassword = (formValue: { token: string | null, new_password: string, confirm_password: string }) => {
    const { token, new_password, confirm_password } = formValue;

    setLoading(true);

    resetPassword(token, new_password, confirm_password).then(
      response => {
        if (response.data.success) {
          alert('Password Reset Successfully');
        }
        setLoading(false);
        navigate('/login');
      },
      error => {
        let messageData = error.response.data.message;
        const resMessage = typeof (messageData) === 'object' ? messageData[0] : messageData;
        setLoading(false);
        setMessage(resMessage);
      }
    );
  }

   

  return (
    <>
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <div className="card-container">
            {/* <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt="profile-img"
              className="profile-img-card"
            /> */}

            <Formik
              initialValues={{token,new_password:"",confirm_password: ""}}
              validationSchema={validationSchema()}
              onSubmit={handleResetPassword}
            >
              <Form>
                <div className="form-group">
                  <Field name="token" type="hidden" className="form-control" />
                </div>

                <div className="form-group">
                  <label htmlFor="new_password">New Password</label>
                  <Field name="new_password" type="password" className="form-control" />
                  <ErrorMessage
                    name="new_password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirm_password">Confirm Password</label>
                  <Field name="confirm_password" type="password" className="form-control" />
                  <ErrorMessage
                    name="confirm_password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Submit</span>
                  </button>
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

export default ResetPassword;