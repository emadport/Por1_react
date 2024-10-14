import React, { useState } from "react";
import {
  TextField,
  Grid,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  Fade,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import Button from "components/Button";
import "./ProjectForm.styles.scss";
import { IoAddCircle } from "react-icons/io5";
import DatePicker from "components/DatePicker";
import AddWorkerForm from "components/AddWorkerForm";
import {
  AddProjectMutationFn,
  AddSubProjectMutationFn,
  Project,
  User,
} from "generated/graphql";
import { MdExpandCircleDown } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import Info from "components/Info";
import convertToLocalDate from "functions/convertToLocalDate";
import withMui from "hoc/withMuiTheme";

function ProjectForm({
  usersArray,
  theme,
  addProject,
  addSubProject,
  companyId,
  onCompleted,
  projects,
}: {
  onCompleted: () => void;
  usersArray: User[];
  theme?: string;
  addProject: AddProjectMutationFn;
  addSubProject?: AddSubProjectMutationFn;
  companyId: string;
  projects?: Project[];
}) {
  const [projectName, setProjectName] = useState("");
  const [budget, setBudget] = useState(0);
  const [beginTime, setBeginTime] = useState<Date>(
    convertToLocalDate(new Date())
  );
  const [estimatedTime, setEstimatedTime] = useState<Date>(
    convertToLocalDate(new Date())
  );
  const [loading, setLoading] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const [operationType, setOperationType] = useState("Project");
  const [workers, onAddWorker] = useState<User[]>([]);
  const [validationError, setValidationError] = useState("");

  // Form validation function
  const validateForm = () => {
    setValidationError("");
    if (!projectName.trim()) {
      setValidationError("Please enter project name");

      return false;
    }
    if (budget <= 0) {
      setValidationError("Please enter valid budget");

      return false;
    }
    if (estimatedTime < beginTime) {
      setValidationError("Estimated time should be after start time");

      return false;
    }
    if (operationType === "Sub project" && selectedProject.length == 0) {
      setValidationError("Select a project please");

      return false;
    }
    return true;
  };

  // Handle Change Functions
  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
    setValidationError("");
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(parseFloat(e.target.value));
    setValidationError("");
  };

  const handleBeginTimeChange = (val: Date) => {
    setBeginTime(val);
    setValidationError("");
  };

  const handleEstimatedTimeChange = (val: Date) => {
    setEstimatedTime(val);
    setValidationError("");
  };

  const handleProjectSelectChange = (e: SelectChangeEvent) => {
    setSelectedProject(e.target.value as string);
    setValidationError("");
  };

  const handleOperationTypeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOperationType(e.target.value);
    setValidationError("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (validateForm()) {
          setLoading(true);
          if (operationType === "Project") {
            addProject({
              variables: {
                companyId: companyId,
                estimatedBudget: budget,
                estimatedFinishTime: estimatedTime,
                startTid: beginTime,
                workers: workers.map((r) => r.id),
                projectName: projectName,
              },
              onCompleted: onCompleted,
            });
          } else if (addSubProject && operationType === "Sub project") {
            addSubProject({
              variables: {
                companyId: companyId,
                estimatedBudget: budget,
                estimatedFinishTime: estimatedTime,
                startTid: beginTime,
                workers: workers.map((r) => r.id),
                projectName: selectedProject,
                subProjectName: projectName,
              },
              onCompleted: onCompleted,
            });
          }
        }
      }}
      className="project-form-wrapper">
      <FormGroup row>
        {["Project", "Sub project"].map((roleItem, i) => (
          <FormControlLabel
            key={i}
            control={
              <Checkbox
                onChange={handleOperationTypeChange}
                checked={operationType === roleItem}
                name={roleItem}
                value={roleItem}
              />
            }
            label={<div>{roleItem}</div>}
          />
        ))}
      </FormGroup>
      {operationType === "Sub project" && (
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
              Project
            </InputLabel>
            <Select
              sx={{ width: "100%", color: "white" }}
              value={selectedProject || ""}
              onChange={handleProjectSelectChange}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="SubProject">
              {projects?.length &&
                projects.flatMap((projectItem) => (
                  <MenuItem
                    key={projectItem._id as string}
                    value={projectItem?.name as string}>
                    {projectItem?.name as string}
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
            label="Projektnamn"
            variant="outlined"
            value={projectName}
            onChange={handleProjectNameChange}
            InputLabelProps={{
              shrink: true,
              style: { color: "white" },
            }}
            inputProps={{ style: { color: "white" } }}
            fullWidth
            placeholder="Enter projekt namn"
            type="text"
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={4}>
          <TextField
            type="number"
            label="Estimerad Budget i timmar"
            variant="outlined"
            style={{ borderRadius: "20px" }}
            value={budget}
            onChange={handleBudgetChange}
            InputLabelProps={{
              shrink: true,
              style: { color: "whiteSmoke", borderRadius: "30px" },
            }}
            inputProps={{
              style: { color: "whiteSmoke", borderRadius: "30px" },
            }}
            fullWidth
            placeholder="Estimerad Budget i timmar"
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
            handleChange={handleBeginTimeChange}
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
            handleChange={handleEstimatedTimeChange}
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
                <span>Perosnal:</span>
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
            onChange={() => setShowUsers(!showUsers)}
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
              Legga till personal
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
      </Grid>
      {validationError ? <Info type="error">{validationError}</Info> : null}
      <Button
        type="submit"
        width="100%"
        label="Lägg till"
        loading={loading}
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
const UserCard = () => {
  return <div style={{ color: "red", fontSize: "33px" }}>ok</div>;
};
export default withMui(ProjectForm);
