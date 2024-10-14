import React, { FormEventHandler, useEffect, useState } from "react";

import "./AddProjectForm.styles.scss";
import {
  AiFillMinusCircle,
  AiOutlineProject
} from "react-icons/ai";
import { IoAddCircle } from "react-icons/io5";
import { Project } from "generated/graphql";

function AddProjectForm({
  projectsArray,
  theme,
  onAdd,
  project
}: {
  projectsArray: Project[];
  theme?: string;
  onAdd: (project: Project) => void;
  project: Project;
}) {
  function onAddWorker(newProject: Project) {
    console.log(newProject);
    onAdd(newProject);
  }
  function onMinusWorker(newProject: Project) {
    onAdd(newProject);
  }

  return (
    <div className="add-project-form">
      {projectsArray &&
        projectsArray?.map((projectItem) => (
          <div
            key={projectItem._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center"
              }}>

              <span>
                <AiOutlineProject
                  className="add-project-screen__icon icon"
                  color={theme}
                />
              </span>
              <span className="modal-users-wrapper__username">
                {projectItem?.name}
              </span>
            </div>

            <span>
              {project && project?._id && projectItem!._id === project!._id ? (
                <AiFillMinusCircle
                  className="project-screen__icon icon"
                  color={theme}
                  onClick={() => onMinusWorker(project)}
                />
              ) : (
                <IoAddCircle
                  color={theme}
                  className="project-screen__icon icon"
                  onClick={() => onAddWorker(projectItem)}
                />
              )}
            </span>
          </div>
        ))}
    </div>
  );
}

export default AddProjectForm;
