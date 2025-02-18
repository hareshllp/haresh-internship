import { useEffect, useState } from "react";
import { getUserInfo } from "../services/user.service";
import Layout from "components/layout";



type Props = {};

type UserData = {
  code: string,
  createdAt: string,
  email: string,
  firstName: string,
  lastName: string,
  phone: string,
  status: string,
  uniqueId: string,
  updatedAt: string,
}

type Flags = {
  isProfileInfoReady: boolean,
  settingsDropdownOpen: boolean
};

type currentUser = UserData | null;


const Dashboard = (props: Props) => {

  const initFlags = {
    isProfileInfoReady: false,
    settingsDropdownOpen: false
  };

  const [flags, setFlags] = useState<Flags>(initFlags);
  const [currentUser, setCurrentUser] = useState<currentUser>(null);


  useEffect(() => {

    let isMounted = true;

    getUserInfo().then(
      res => {
        if (isMounted) {
          setCurrentUser(res.data.user);
          setFlags({ ...flags, isProfileInfoReady: true });
        }
      },
      error => {
        alert('Taking time to fetch data.. PLease try after some time');
      }
    );

    return () => {
      isMounted = false;
    }


  }, []);

  return (
    <>

      <Layout>
        <div className="row">
          <div className="col-md-6">
            <strong>Information</strong>
            <div className="table-responsive">
              {!flags.isProfileInfoReady && <span className="spinner-border spinner-border-sm"></span>}
              {flags.isProfileInfoReady &&
                <table className="table table-user-information">
                  <tbody>

                    <>
                      <tr>
                        <td><strong>First Name</strong></td>
                        <td className="text-primary">{currentUser ? currentUser.firstName : ""}</td>
                      </tr>
                      <tr>
                        <td><strong>Last Name</strong></td>
                        <td className="text-primary">{currentUser ? currentUser.lastName : ""}</td>
                      </tr>
                      <tr>
                        <td><strong>Email</strong></td>
                        <td className="text-primary">{currentUser ? currentUser.email : ""}</td>
                      </tr>
                      <tr>
                        <td><strong>Phone</strong></td>
                        <td className="text-primary">{currentUser ? currentUser.phone : ""}</td>
                      </tr>
                    </>

                  </tbody>
                </table>
              }
            </div>
          </div>
        </div>
      </Layout>

    </>
  );

}

export default Dashboard;