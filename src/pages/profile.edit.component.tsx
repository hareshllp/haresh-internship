import { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import {getUserInfo,updateProfile} from "../services/user.service";
import Layout from "components/layout";

type Props = {};

type ProfileFlags = {
  loading: boolean,
  message: string,
  successful: boolean,
  profileReady:boolean
};

type ProfileData = {
  email: string,
  firstName: string,
  lastName: string,
  phone: string,
  code: string,
}


function validationSchema() {
  return Yup.object().shape({
    firstName: Yup.string().required("This field is required!"),
    lastName: Yup.string().required("This field is required!"),
    code: Yup.string().required("This field is required!"),
    phone: Yup.string().required("This field is required!"),
  });
}



const EditProfile = (props: Props) => {
  console.log('coming') 
  const initialProfileData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    code: ""
  }

  const defaultProfileFlags = {
    loading: false,
    message: "",
    successful: false,
    profileReady:false
  };

  const [profile, setProfile] = useState<ProfileData>(initialProfileData);
  const [flags, setFlags] = useState<ProfileFlags>(defaultProfileFlags);

  useEffect(() => {
    
    let isProfileMounted = true;

    // get user and set form fields
    getUserInfo().then(
      res => {
        if(isProfileMounted){
          const { firstName, lastName, email, phone, code } = res.data.user;
          setProfile({ ...profile, firstName, lastName, email, phone, code });
          setFlags({...flags,profileReady:true})
        }
      },
      error => {
        alert('Taking time to fetch data.. Please try after some time');
      }
    );

    return () => {
      isProfileMounted = false;
    }

  }, []);

  // useEffect(() => {
  //   console.log(profile);
  // },[]);

  const handleUpdateProfile = (formValue: ProfileData) => {

    setFlags({ ...flags, loading: true });

    updateProfile(
      formValue.firstName,
      formValue.lastName,
      formValue.email,
      formValue.phone,
      formValue.code
    ).then(
      response => {
        console.log(response);
        setFlags({ ...flags, loading: false, successful: true, message: "User Profile Updated Successfully" });
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setFlags({ ...flags, loading: false, successful: false, message: resMessage });
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
            {!flags.profileReady && <span className="spinner-border spinner-border-sm"></span>}
            {flags.profileReady &&  
              <Formik
                enableReinitialize={true}
                initialValues={profile}
                validationSchema={validationSchema()}
                onSubmit={handleUpdateProfile}
              >
                <Form>
                  <div>
                    <div className="form-group">
                      <label htmlFor="email"> Email </label>
                      <Field name="email" type="text" className="form-control" disabled />
                    </div>

                    <div className="form-group">
                      <label htmlFor="firstName"> First Name </label>
                      <Field name="firstName" type="text" className="form-control" />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastName"> Last Name </label>
                      <Field name="lastName" type="text" className="form-control" />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="code"> Code </label>
                      <Field name="code" type="text" className="form-control" />
                      <ErrorMessage
                        name="code"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone"> Phone Number </label>
                      <Field name="phone" type="text" className="form-control" />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="alert alert-danger"
                      />
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary btn-block" disabled={flags.loading}> {flags.loading && (<span className="spinner-border spinner-border-sm"></span>)} Submit</button>
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
            }  
            </div>
          </div>
        </div>
      </Layout>
    </>
  );

}

export default EditProfile;