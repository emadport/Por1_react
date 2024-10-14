import React, { useState } from "react";
import {
  TextField,
  Grid,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  Fade,
  SelectChangeEvent,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Button from "components/Button";
import "./TaskForm.styles.scss";
import { IoAddCircle } from "react-icons/io5";
import DatePicker from "components/DatePicker";
import AddWorkerForm from "components/AddWorkerForm";
import {
  AddSubTaskMutationFn,
  AddTaskMutationFn,
  GetProjectsByCompanyQuery,
  User,
} from "generated/graphql";
import { MdExpandCircleDown } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import Info from "components/Info";
import withMui from "hoc/withMuiTheme";

function TaskForm({
  usersArray,
  theme,
  addTask,
  companyId,
  addSubTask,
  projectsArray,
  onSuccess,
  addTaskLoading,
  addSubTaskLoading,
  projectId,
}: {
  usersArray: User[];
  theme?: string;
  addTask: AddTaskMutationFn;
  addSubTask?: AddSubTaskMutationFn;
  companyId: string;
  projectsArray?: GetProjectsByCompanyQuery;
  onSuccess: () => void;
  addTaskLoading?: boolean;
  addSubTaskLoading?: boolean;
  projectId?: string;
}) {
  const [taskName, setTaskName] = useState("");
  const [beginTime, setBeginTime] = useState<Date>(new Date());
  const [estimatedTime, setEstimatedTime] = useState<Date>(new Date());
  const [loading, setLoading] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [workers, onAddWorker] = useState<User[]>([]);
  const [project, onAddProject] = useState<string>("");
  const [validationError, setValidationError] = useState("");
  const [success, setSuccess] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");
  const [operationType, setOperationType] = useState("Task");

  // Form validation function
  const validateForm = () => {
    setValidationError("");
    if (!taskName.trim()) {
      setValidationError("Please enter a task name");

      return false;
    }

    if (beginTime < new Date()) {
      setValidationError("Begin time cannot be in the past");

      return false;
    }

    if (estimatedTime <= beginTime) {
      setValidationError("Estimated time should be after the start time");

      return false;
    }

    if (workers.length === 0) {
      setValidationError("Please assign at least one worker");

      return false;
    }

    if (operationType === "Task" && !projectId && !project) {
      setValidationError("Please select a project");

      return false;
    }

    return true;
  };

  function handleTaskSelectChange(e: SelectChangeEvent) {
    setValidationError("");
    onAddProject(e.target.value);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (validateForm()) {
          setLoading(true);
          if (operationType === "Task") {
            addTask({
              variables: {
                projectId: projectId
                  ? projectId
                  : (projectsArray?.getProjectsByCompany
                      ?.flatMap((r) => r?.subProjects)
                      ?.find((r) => r?.name === project)?._id as string),
                taskName,
                startTid: beginTime,
                estimatedFinishTime: estimatedTime,
                workers: [...workers.map((r) => r.id as string)],
              },
              onCompleted: () => {
                onSuccess();
                setSuccess(true);
              },
            });
          }
          if (operationType === "Sub task" && addSubTask) {
            addSubTask({
              variables: {
                subTaskName: taskName,
                taskName: selectedTask,
                startTid: beginTime,
                estimatedFinishTime: estimatedTime,
                workers: [...workers.map((r) => r.id as string)],
              },
              onCompleted: () => {
                onSuccess();
                setSuccess(true);
              },
            });
          }
        }
      }}
      className="task-form-wrapper">
      <FormGroup row>
        {["Task", "Sub task"].map((roleItem, i) => (
          <FormControlLabel
            key={i}
            control={
              <Checkbox
                onChange={(r) => {
                  setOperationType(r.target.value);
                  setValidationError("");
                }}
                checked={operationType === roleItem}
                name={roleItem}
                value={roleItem}
              />
            }
            label={
              <div style={{ color: theme === "dark" ? "#fff" : "#383838" }}>
                {roleItem}
              </div>
            }
          />
        ))}
      </FormGroup>
      {operationType === "Sub task" && (
        <Grid
          item
          xs={12}
          style={{ marginBottom: "15px" }}
          sm={4}
          width="100%">
          <FormControl fullWidth>
            <InputLabel
              sx={{ color: "white", opacity: "0.8" }}
              id="demo-simple-select-label">
              Parent task
            </InputLabel>
            <Select
              sx={{ width: "100%", color: "white" }}
              value={selectedTask || ""}
              onChange={(res) => {
                setSelectedTask(res.target.value as string);
                setValidationError("");
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Parent task">
              {projectsArray?.getProjectsByCompany?.length &&
                projectsArray.getProjectsByCompany
                  .flatMap((project) => project?.subProjects)
                  .flatMap((r) => r?.tasks)
                  .map((taskItem) => (
                    <MenuItem
                      key={taskItem!._id as string}
                      value={taskItem?.name as string}>
                      {taskItem?.name as string}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>
        </Grid>
      )}
      <Grid
        container
        spacing={2}
        direction="column">
        <Grid
          item
          xs={12}
          sm={4}>
          <TextField
            label="Namn på task"
            variant="outlined"
            value={taskName}
            onChange={(e) => {
              setTaskName(e.target.value);
              setValidationError("");
            }}
            InputLabelProps={{
              shrink: true,
              style: { color: "white" },
            }}
            inputProps={{ style: { color: "white" } }}
            fullWidth
            placeholder="Lägg till namn"
            type="text"
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={4}>
          <DatePicker
            label="Starttid"
            value={beginTime as Date}
            defaultValue={beginTime}
            handleChange={(val: Date) => setBeginTime(val)}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={4}>
          <DatePicker
            label="Estimated Time"
            value={estimatedTime as Date}
            defaultValue={estimatedTime}
            handleChange={(val: Date) => {
              setEstimatedTime(val);
              setValidationError("");
            }}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={4}
          width="100%">
          {workers!.length > 0 ? (
            <div style={{ paddingLeft: "1em" }}>
              <label className="label-container">
                <span>Personal:</span>
              </label>
              <div>
                {workers!.length > 0
                  ? workers.map((r: User) => {
                      return (
                        <div key={r.id}>
                          <span>
                            <FaUser
                              style={{ marginRight: "3px", opacity: "0.7" }}
                            />
                          </span>
                          <span>{r?.username as string}</span>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          ) : null}

          <Accordion
            slotProps={{ transition: { timeout: 400 } }}
            expanded={showUsers}
            onChange={() => {
              setShowUsers(!showUsers);
              setValidationError("");
            }}
            sx={{
              color: "white",
              border: `1px solid ${"#49b4b862"}`,
              backgroundColor: "transparent",
              "& .MuiAccordion-region": { height: showUsers ? "auto" : 0 },
            }}>
            <AccordionSummary
              expandIcon={
                <MdExpandCircleDown
                  size={34}
                  color={"#ffff"}
                />
              }
              aria-controls="panel3-content"
              id="panel3-header">
              Tilldela personal

            </AccordionSummary>
            <Fade
              in={showUsers}
              timeout={400}>
              <AccordionDetails>
                <AddWorkerForm
                  usersArray={usersArray}
                  theme={theme}
                  onAdd={onAddWorker}
                  workers={workers}
                />
              </AccordionDetails>
            </Fade>
          </Accordion>
        </Grid>

        {operationType === "Task" && !projectId ? (
          <Grid
            item
            xs={12}
            sm={4}>
            <div className="task-form-wrapper__select">
              <FormControl fullWidth>
                <InputLabel
                  sx={{ color: "white", opacity: "0.8" }}
                  id="demo-simple-select-label">
                  Project
                </InputLabel>
                <Select
                  sx={{ width: "100%", color: "white" }}
                  value={project || ""}
                  onChange={handleTaskSelectChange}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="SubProject">
                  {projectsArray &&
                    projectsArray.getProjectsByCompany &&
                    projectsArray.getProjectsByCompany.flatMap((project) =>
                      project!.subProjects
                        ? project!.subProjects.map((subProject) => (
                            <MenuItem
                              key={subProject?._id as string}
                              value={subProject?.name as string}>
                              {subProject?.name as string}
                            </MenuItem>
                          ))
                        : null
                    )}
                </Select>
              </FormControl>
            </div>
          </Grid>
        ) : null}
      </Grid>

      {validationError ? <Info type="error">{validationError}</Info> : null}
      {success ? <Info type="success">Succeed</Info> : null}
      <Button
        type="submit"
        width="100%"
        label="Lägg till"
        loading={addTaskLoading || success}
        icon={
          <IoAddCircle
            color="#383838"
            size={23}
          />
        }
      />
    </form>
  );
}

export default withMui(TaskForm);
