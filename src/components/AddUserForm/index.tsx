import React, { useState } from "react";
import {
  TextField,
  Grid,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  Fade,
} from "@mui/material";
import Button from "components/Button";
import "./AddUserForm.styles.scss";
import { IoAddCircle } from "react-icons/io5";
import DatePicker from "components/DatePicker";
import AddWorkerForm from "components/AddWorkerForm";
import { AddProjectMutationFn, User } from "generated/graphql";
import { MdExpandCircleDown } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import Info from "components/Info";
import { themeColor } from "utils/theme";
import convertToLocalDate from "functions/convertToLocalDate";

function AddUserForm({
  usersArray,
  theme,
  handleSubmit,
  companyId,
  onCompleted,
}: {
  onCompleted: () => void;
  usersArray: User[];
  theme?: string;
  handleSubmit: AddProjectMutationFn;
  companyId: string;
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
  const [workers, onAddWorker] = useState<User[]>([]);

  const [validationError, setValidationError] = useState("");

  // Form validation function
  const validateForm = () => {
    setValidationError("");
    if (!projectName.trim()) {
      setValidationError("Please enter project name");
      alert("Please enter project name");
      return false;
    }
    if (budget <= 0) {
      setValidationError("Please enter valid budget");
      alert("Please enter valid budget");
      return false;
    }
    if (estimatedTime < beginTime) {
      setValidationError("Estimated time should be after start time");
      alert("Estimated time should be after start time");
      return false;
    }
    return true;
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (validateForm()) {
          setLoading(true);
          handleSubmit({
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
        }
      }}
      className="project-form-wrapper">
      <Grid
        container
        spacing={2}
        direction="column">
        <Grid
          item
          xs={12}
          sm={4}>
          <TextField
            label="anvendare Email"
            variant="outlined"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            InputLabelProps={{
              shrink: true,
              style: { color: "white" },
            }}
            inputProps={{ style: { color: "white" } }}
            fullWidth
            placeholder="Lägg till email"
            type="text"
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={4}>
          <TextField
            type="text"
            label="Username"
            variant="outlined"
            style={{ borderRadius: "20px" }}
            value={budget}
            onChange={(e) => setBudget(parseFloat(e.target.value))}
            InputLabelProps={{
              shrink: true,
              style: { color: "whiteSmoke", borderRadius: "30px" },
            }}
            inputProps={{
              style: { color: "whiteSmoke", borderRadius: "30px" },
            }}
            fullWidth
            placeholder="Skriv ett username"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}>
          <TextField
            type="number"
            label="Tid per vecka"
            variant="outlined"
            style={{ borderRadius: "20px" }}
            value={budget}
            onChange={(e) => setBudget(parseFloat(e.target.value))}
            InputLabelProps={{
              shrink: true,
              style: { color: "whiteSmoke", borderRadius: "30px" },
            }}
            inputProps={{
              style: { color: "whiteSmoke", borderRadius: "30px" },
            }}
            fullWidth
            placeholder="Skriv ett username"
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
            value={beginTime as Date}
            defaultValue={beginTime}
            handleChange={(val: Date) => setEstimatedTime(val)}
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

export default AddUserForm;
