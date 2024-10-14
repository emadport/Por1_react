import React, { useState } from "react";
import {
  TextField,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormLabel,
  checkboxClasses,
} from "@mui/material";
import Button from "components/Button";
import "./CreateUser.styles.scss";
import { IoAddCircle } from "react-icons/io5";
import Info from "components/Info";
import { UserRoleEnum } from "types/sharedTypes";
import { RegisterNewUserMutationFn, User } from "generated/graphql";
import NumberInput from "components/NumberInput";

function CreateUserForm({
  theme,
  handleSubmit,
  companyId,
  onCompleted,
  loading,
  error,
  user,
}: {
  onCompleted: () => void;
  theme?: string;
  handleSubmit: RegisterNewUserMutationFn;
  companyId: string;
  loading: boolean;
  error: string;
  user: User;
}) {
  const [email, setEmail] = useState("");
  const [relativeName, setRelativeName] = useState("");
  const [bankAccont, setBankAccount] = useState("");
  const [relativeNumber, setRelativeNumber] = useState("");
    const [carRegisteringNumber, setCarRegisteringNumber] = useState("");
  const [workHoursInWeek, setWorkHoursInWeek] = useState(0);
  const [username, setUsername] = useState("");
  const [address, setaddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [personalNumber, setPersonalNumber] = useState("");
  const [salary, setSalary] = useState(0);
  const [telephoneNumber, setTelephoneNumber] = useState(0);

  const [role, setRole] = useState<UserRoleEnum>();

  const [validationError, setValidationError] = useState("");

  // Form validation function
  const validateForm = () => {
    setValidationError("");
    if (!user) {
      setValidationError("It seems that you are logged out, try later");

      return false;
    }
    if (!username.trim()) {
      setValidationError("Please choose a username");

      return false;
    }
    if (workHoursInWeek <= 1) {
      setValidationError("Please enter valid budget");

      return false;
    }

    return true;
  };

  const handleChangeRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.name as UserRoleEnum);
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          if (validateForm()) {
            await handleSubmit({
              variables: {
                email: email,
                username: username,
                workHoursInWeek: workHoursInWeek,
                role: role as UserRoleEnum,
                companyId: user.company?._id as string,
                personalNumber: personalNumber, // no parseFloat
                address: address,
                postalCode: postalCode, // no parseFloat
                salary: salary,
                relativeName: relativeName,
                relativeNumber: relativeNumber,
                carRegisteringNumber:carRegisteringNumber,
                bankAccount:bankAccont
              },
              onCompleted: onCompleted,
            });
          }
        } catch (error) {
          return;
        }
      }}>
      <Grid
        container
        spacing={2}
        direction="column">
        <FormGroup
          className="user-roles-parent"
          row>
          {Object.values(UserRoleEnum).map((roleItem, i) => (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  onChange={handleChangeRole}
                  checked={role === roleItem}
                  name={roleItem}
                />
              }
              label={
                <div style={{ color: theme === "dark" ? "#fff" : "#282828" }}>
                  {roleItem}
                </div>
              }
            />
          ))}
        </FormGroup>

        <Grid
          style={{ width: "100%" }}
          item
          xs={12}
          sm={4}>
          <div style={{ marginBottom: "5px" }}>
            <FormLabel style={{ fontSize: "14px" }}>Person nummer:</FormLabel>
          </div>
          <NumberInput
            otp={personalNumber}
            setOtp={setPersonalNumber}
            length={12}
            theme={theme as string}
            
          />
        </Grid>
        <Grid
          style={{ width: "100%" }}
          item
          xs={12}
          sm={4}>
          <TextField
            label="användares Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{
              shrink: true,
              style: { color: "white" },
            }}
            inputProps={{ style: { color: "white" } }}
            fullWidth
            placeholder="Legga email"
            type="text"
          />
        </Grid>
        <Grid
          style={{ width: "100%" }}
          item
          xs={12}
          sm={4}>
          <TextField
            label="Anhörig namn"
            variant="outlined"
            value={relativeName}
            onChange={(e) => setRelativeName(e.target.value)}
            InputLabelProps={{
              shrink: true,
              style: { color: "white" },
            }}
            inputProps={{ style: { color: "white" } }}
            fullWidth
            placeholder="Skriv din anhörig namn"
            type="text"
          />
        </Grid>
        <Grid
          style={{ width: "100%" }}
          item
          xs={12}
          sm={4}>
          <TextField
            label="Anhörig telephone"
            variant="outlined"
            value={relativeNumber}
            onChange={(e) => setRelativeNumber(e.target.value)}
            InputLabelProps={{
              shrink: true,
              style: { color: "white" },
            }}
            inputProps={{ style: { color: "white" } }}
            fullWidth
            placeholder="Skriv din anhörig telephone number"
            type="text"
          />
        </Grid>
        <Grid
          style={{ width: "100%" }}
          item
          xs={12}
          sm={4}>
          <TextField
            label="användares Lön"
            variant="outlined"
            value={salary}
            onChange={(e) => setSalary(parseFloat(e.target.value))}
            InputLabelProps={{
              shrink: true,
              style: { color: "white" },
            }}
            inputProps={{ style: { color: "white" }, inputMode: "numeric" }}
            fullWidth
            placeholder="Legga lön"
            type="number"
          />
        </Grid>
        <Grid
          style={{ width: "100%" }}
          item
          xs={12}
          sm={4}>
          <TextField
            label="användares Telephone nummer"
            variant="outlined"
            value={telephoneNumber}
            onChange={(e) => setTelephoneNumber(parseFloat(e.target.value))}
            InputLabelProps={{
              shrink: true,
              style: { color: "white" },
            }}
            inputProps={{ style: { color: "white" }, inputMode: "numeric" }}
            fullWidth
            placeholder="Legga Tel nummer"
            type="number"
          />
        </Grid>
        <Grid
          style={{ width: "100%" }}
          item
          xs={12}
          sm={4}>
          <TextField
            label="användares Address"
            variant="outlined"
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            InputLabelProps={{
              shrink: true,
              style: { color: "white" },
            }}
            inputProps={{ style: { color: "white" } }}
            fullWidth
            placeholder="Användares address"
            type="text"
          />
          <Grid
            style={{ width: "100%",minWidth:'100%' }}
            item
            xs={12}
            sm={4}>
            <div style={{ marginBottom: "5px" }}>
              <FormLabel style={{ fontSize: "14px" }}>Post address:</FormLabel>
            </div>
            <NumberInput
              otp={postalCode}
              setOtp={setPostalCode}
              length={5}
              theme={theme as string}
      
            />
          </Grid>
        </Grid>

        <Grid
          style={{ width: "100%" }}
          item
          xs={12}
          sm={4}>
          <TextField
            type="text"
            autoComplete="off"
            autoCorrect="off"
            label="Användares username"
            variant="outlined"
            style={{ borderRadius: "20px" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputLabelProps={{
              shrink: true,
              style: { color: "whiteSmoke", borderRadius: "30px" },
            }}
            inputProps={{
              autoComplete: "off",
              style: { color: "whiteSmoke", borderRadius: "30px" },
            }}
            fullWidth
            placeholder="Skriv ett username"
          />
        </Grid>
        <Grid
          item
          xs={12}
          style={{ width: "100%" }}
          sm={4}>
          <TextField
            type="number"
            label="Tid per vecka"
            variant="outlined"
            style={{ borderRadius: "20px" }}
            value={workHoursInWeek}
            onChange={(e) => setWorkHoursInWeek(parseFloat(e.target.value))}
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
          style={{ width: "100%",minWidth:'100%'  }}
          item
          xs={12}
          sm={4}>
          <div style={{ marginBottom: "5px" }}>
            <FormLabel style={{ fontSize: "14px" }}>Bank konto:</FormLabel>
          </div>
          <NumberInput
            otp={bankAccont}
            setOtp={setBankAccount}
            length={11}
            theme={theme as string}
          
          />
        </Grid>
             <Grid
          style={{ width: "100%",minWidth:'100%',  }}
          item
          xs={12}
          sm={4}>
          <div style={{ marginBottom: "5px" }}>
            <FormLabel style={{ fontSize: "14px" }}>Bil registering nummer:</FormLabel>
          </div>
          <NumberInput
            otp={carRegisteringNumber}
            setOtp={setCarRegisteringNumber}
            length={6}
            theme={theme as string}
          
          />
        </Grid>
      </Grid>
      {validationError ? <Info type="error">{validationError}</Info> : null}
      {error ? <Info type="error">{error}</Info> : null}
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

export default CreateUserForm;
