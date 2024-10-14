import "./AddTask.scss";
import Label from "components/Label";
import {
  GetProjectByNameQuery,
  GetProjectsByCompanyQuery,
  User,
  useAddSubTaskMutation,
  useAddTaskMutation,
  useAddUserToProjectMutation,
  useGetProjectsByCompanyLazyQuery,
  useGetUsersByAdminLazyQuery,
} from "generated/graphql";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import BackButton from "components/BackButton/BackButton";
import useAuth from "hooks/Auth.hook";
import { useEffect, useState } from "react";
import Info from "components/Info";
import TaskForm from "../../components/TaskForm";
import withMuiType from "hoc/withMuiTheme";
import { useTheme } from "hooks/theme.hook";

const AddTask = () => {
  const [workersModal, openWorkersModal] = useState(true);
  const [workers, onAddWorker] = useState<User[]>();
  const [addUserToProject] = useAddUserToProjectMutation();
  const theme = useTheme();
  const { user } = useAuth();
  const [project, setProject] = useState<GetProjectByNameQuery>();
  const [
    addTask,
    { loading: addTaskLoading, data: addTaskData, error: addTaskError },
  ] = useAddTaskMutation({ fetchPolicy: "network-only" });
  const [
    addSubTask,
    { loading: addSubTaskLoading, data: addSubTaskData, error: addSubTaskError },
  ] = useAddSubTaskMutation({ fetchPolicy: "network-only" });
  const [getUsers, { data: usersArray }] = useGetUsersByAdminLazyQuery({
    fetchPolicy: "network-only",
  });
  const [getProjects, { data: projectsArray }] =
    useGetProjectsByCompanyLazyQuery({
      fetchPolicy: "network-only",
    });
  const [searchParams] = useSearchParams();
  const [addUserSuccess, setAddUserSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.currentUser) {
      getProjects({
        variables: { id: user?.currentUser.company?._id as string },
          onError: (err) => {
          console.log(err)
          
        },
        onCompleted: (res) => {
          console.log(res)
          setProject(res);
        },
      });
    }
  }, [user?.currentUser]);

  useEffect(() => {
    if (workersModal && user?.currentUser) {
      getUsers({
        variables: { adminId: user?.currentUser.id as string },
 
      });
    }
  }, [workersModal,user]);
  function onPushuUser(projectId: string, workers: string[]) {
    addUserToProject({
      variables: {
        projectId: projectId,
        users: workers,
      },
      onError: (err) => {
        console.log(err.graphQLErrors.map((err) => err.extensions));
      },
      onCompleted: () => {
        setAddUserSuccess(true);

        setTimeout(() => {
          openWorkersModal(false);
          setAddUserSuccess(false);
        }, 2000);
      },
    });
  }

  useEffect(() => {
    onAddWorker(project?.getProjectByName?.workers as User[]);
  }, [project?.getProjectByName]);

  function onSuccess() {
    setTimeout(() => {
      navigate("/dashboard/detail");
    }, 2500);
  }
  return (
    <div className="add-task-screen">
      <BackButton
        onNavigate={() =>
          navigate(`/dashboard/detail/?date=${searchParams.get("date")??new Date().toISOString()}`)
        }
      />
      <Label label="Lägg till aktivitet" />
      <div style={{ minWidth: "400px" }}>
        {user?.currentUser && (
          <TaskForm
            theme={theme?.theme}
            companyId={user?.currentUser.company?._id as string}
            usersArray={usersArray?.getUsersByAdmin as User[]}
            addTask={addTask}
             addSubTask={addSubTask}
            projectsArray={projectsArray as GetProjectsByCompanyQuery}
            onSuccess={onSuccess}
            addTaskLoading={addTaskLoading}
            addSubTaskLoading={addSubTaskLoading}
          />
        )}
      </div>

      {addUserSuccess ? <Info type="success">Task added!</Info> : null}
    </div>
  );
};

export default withMuiType(AddTask);
