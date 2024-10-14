import "./AddProject.scss";
import Label from "components/Label";
import {
  AddProjectMutationFn,
  AddSubProjectMutationFn,
  GetProjectByNameQuery,
  Project,
  User,
  useAddProjectMutation,
  useAddSubProjectMutation,
  useAddUserToProjectMutation,
  useGetProjectByNameLazyQuery,
  useGetProjectsByCompanyLazyQuery,
  useGetUsersByAdminLazyQuery,
} from "generated/graphql";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import BackButton from "components/BackButton/BackButton";
import useAuth from "hooks/Auth.hook";
import { useEffect, useState } from "react";
import Info from "components/Info";
import ProjectForm from "components/ProjectForm";

const AddProject = () => {
  const [getProjectByName, { refetch: refetchProjects }] =
    useGetProjectByNameLazyQuery({
      fetchPolicy: "network-only",
    });
      const [getAllProjects, { data:allProjects }] =
    useGetProjectsByCompanyLazyQuery({
      fetchPolicy: "network-only",
    });
  const [addSubProject] = useAddSubProjectMutation();
  const [addProject] = useAddProjectMutation();
  const [workersModal, openWorkersModal] = useState(true);
  const [workers, onAddWorker] = useState<User[]>();
  const [addUserToProject] = useAddUserToProjectMutation();
  const { user } = useAuth();
  const [project, setProject] = useState<GetProjectByNameQuery>();
  const [getUsers, { data: usersArray }] = useGetUsersByAdminLazyQuery();
  const [searchParams] = useSearchParams();
  const { task: taskName, projectName: projectQuery } = useParams();
  const [addUserSuccess, setAddUserSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
if(user?.currentUser){
  getProjectByName({
      variables: { projectName: projectQuery as string },
      onCompleted: (res) => {
        setProject(res);
      },
    });
      getAllProjects({
      variables: { id: user?.currentUser?.company?._id as string },
      onCompleted: (res) => {
        setProject(res);
      },
    });
}
  
  }, [taskName, projectQuery,user?.currentUser]);

  useEffect(() => {
    if (workersModal && user?.currentUser) {
      getUsers({
        variables: { adminId: user?.currentUser.id as string },
        onCompleted: (res) => {},
      });
    }
  }, [workersModal, user]);

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
        refetchProjects();
        setTimeout(() => {
          openWorkersModal(false);
          setAddUserSuccess(false);
          navigate(0);
        }, 2000);
      },
    });
  }

  useEffect(() => {
    onAddWorker(project?.getProjectByName?.workers as User[]);
  }, [project?.getProjectByName]);

  function onAddCompleted() {
    setAddUserSuccess(true);
    setTimeout(() => {
      navigate("/dashboard/detail");
    }, 2500);
  }

  return (
    <div className="add-project-screen" >
      <BackButton
        onNavigate={() =>
          navigate(`/dashboard/detail/?date=${searchParams.get("date")??new Date().toISOString()}`)
        }
      />
      <Label label="Lägg till projekt" />
      <div style={{ minWidth: "400px" }}>
        {user?.currentUser && (
          <ProjectForm
            companyId={user?.currentUser.company?._id as string}
            usersArray={usersArray?.getUsersByAdmin as User[]}
            addProject={addProject as AddProjectMutationFn}
            addSubProject={addSubProject as AddSubProjectMutationFn}
            onCompleted={onAddCompleted}
            projects={allProjects?.getProjectsByCompany as Project[]}
          />
        )}
      </div>

      {addUserSuccess ? <Info type="success">Project added!</Info> : null}
    </div>
  );
};

export default AddProject;
