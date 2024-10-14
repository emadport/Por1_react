import "./CreateUser.scss";
import Label from "components/Label";
import {
  GetProjectByNameQuery,
  User,
  useGetUsersByAdminLazyQuery,
  useRegisterNewUserMutation,
} from "generated/graphql";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import BackButton from "components/BackButton/BackButton";
import useAuth from "hooks/Auth.hook";
import { useState } from "react";
import Info from "components/Info";
import CreateUserForm from "components/CreateUserForm";
import { useTheme } from "hooks/theme.hook";

const CreateUser = () => {
  const [
    registerNewUserMutation,
    { loading: registerUserMutationLoading, error: registerUserError },
  ] = useRegisterNewUserMutation();

  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [addUserSuccess, setAddUserSuccess] = useState(false);
  const navigate = useNavigate();
  const theme=useTheme()

  function onAddCompleted() {
    setAddUserSuccess(true);
    setTimeout(() => {
      navigate(
        `/dashboard/detail/?date=${
          searchParams.get("date") ?
          searchParams.get("date") :
          new Date().toISOString()
        }`
      );
    }, 1500);
  }
  return (
    <div className="create-user-screen">
      <BackButton
        onNavigate={() =>
          navigate(
            `/dashboard/detail/${searchParams.toString()}
            }`
          )
        }
      />
      <Label label="Skapa ny användare" />
      <div style={{ minWidth: "400px" }}>
        {user?.currentUser && (
          <CreateUserForm
            error={registerUserError?.message as string}
            loading={registerUserMutationLoading}
            companyId={user?.currentUser.company?._id as string}
            handleSubmit={registerNewUserMutation}
            onCompleted={onAddCompleted}
            user={user.currentUser as User}
            theme={theme?.theme}
          />
        )}
      </div>

      {addUserSuccess ? <Info type="success">User added successfully!</Info> : null}
    </div>
  );
};

export default CreateUser;
