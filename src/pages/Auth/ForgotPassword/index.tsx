import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import "./PasswordReset.scss";
import Input from "components/Input";
import Button from "components/Button";
import {
  useNavigate,
  useLocation,
  useParams,
  Link,
  useSearchParams,
} from "react-router-dom";
import Info from "components/Info";
import {
  useResetPasswordMutation,
  useSendMailMutation,
  useVerifyTokenLazyQuery,
} from "generated/graphql";
import SimpleLoading from "components/Loading";

interface LocationState {
  from: {
    pathname: string;
  };
}

export default function PasswordReset() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(true); // State to track overall form validity
  const [error, setError] = useState("");
  const [isSucceeded, setIsSucceeded] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const [tokenError, setTokenError] = useState(false);
  const [isLinkSent, setLinkSent] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [sendResetLink, { data: sendLinkData, loading: sendLinkLoading }] =
    useSendMailMutation({ fetchPolicy: "network-only" });
  const [
    resetThePassword,
    { data: resetPasswordData, loading: resetPasswordLoading },
  ] = useResetPasswordMutation({ fetchPolicy: "network-only" });
  const [verifyToken, { error: validateTokenError }] = useVerifyTokenLazyQuery({
    nextFetchPolicy: "network-only",
  });

  const handleSendLink = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTokenError(false);
    // Validate email format
    if (!validateEmail(email)) {
      setError("Invalid email format");
      setIsFormValid(false);
      return;
    }

    // Send reset link
    sendResetLink({
      variables: {
        from: "",
        to: email,
        text: "You can click on the link to reset your password",
        title: "Reset password link",
        platform: "webb",
      },
    });
    setLinkSent(true);
  };
  useEffect(() => {
    if (validateTokenError) {
      setTokenError(true);
    }
  }, [validateTokenError]);

  const handleResetPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if password and repeat password fields are empty
    if (!password || !repeatPassword) {
      setError("Password fields cannot be empty");
      setIsFormValid(false);
      return;
    }

    // Check if passwords meet minimum length requirement
    const minPasswordLength = 4; // Example minimum length
    if (
      password.length < minPasswordLength ||
      repeatPassword.length < minPasswordLength
    ) {
      setError(
        `Password must be at least ${minPasswordLength} characters long`
      );
      setIsFormValid(false);
      return;
    }

    // Check if passwords match
    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsFormValid(false);
      return;
    }
    // Handle password reset
    if (!params["token"]) {
      return;
    }
    resetThePassword({
      variables: {
        newPassword: password,
        passToken: params["token"],
        email: email,
      },
      onCompleted: (err) => {
        const platform = searchParams.get("platform");
        if (platform === "webb") {
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          setEmail("");
          setPassword("");
          setRepeatPassword("");
        }
      },
      onError: (e) => e.graphQLErrors.map((e) => console.log(e.extensions)),
    });
  };

  // Function to validate email format
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  useEffect(() => {
    const token = params["token"];

    setLinkSent(false);

    if (token != "null") {
      verifyToken({
        variables: { token: token },
        onCompleted: (res) => {
          setHasToken(true);
          setEmail(res.verifyToken?.valueOf() as string);
        },
        onError: (e) => {
          console.log(e);
          setHasToken(false);
        },
      });
      setHasToken(true);
    }
  }, [params]);

  return (
    <div className="forget-password-container">
      <img
        src="/email2.png"
        width={"100%"}></img>
      <h1>
        {sendLinkData
          ? `Password reset link sent to ${email}`
          : "Password Reset"}
      </h1>

      {!sendLinkData && <p>Forgot your password?</p>}
      {/* Form content */}
      <form onSubmit={hasToken ? handleResetPassword : handleSendLink}>
        {/* Email input */}
        <Input
          placeholder="Enter your email"
          label="Email"
          value={email}
          handleChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTokenError(false)
            setIsFormValid(true);
            setEmail(e.target.value);
          }}
        />

        {/* Password inputs */}
        {hasToken && (
          <>
            <Input
              type="password"
              placeholder="Enter your Password"
              label="Password"
              value={password}
              handleChange={(e: ChangeEvent<HTMLInputElement>) => {
                setIsFormValid(true);
                setPassword(e.target.value);
              }}
            />
            <Input
              type="password"
              placeholder="Repeat your Password"
              label="Repeat Password"
              value={repeatPassword}
              handleChange={(e: ChangeEvent<HTMLInputElement>) => {
                setIsFormValid(true);
                setRepeatPassword(e.target.value);
              }}
            />
          </>
        )}

        {/* Error message */}
        {!isFormValid && <Info type="error">{error}</Info>}
        {/* Error message on token */}
        {tokenError && (
          <Info type="error">{"Token is expired, try to reset again"}</Info>
        )}
        {/* Success message */}
        {isSucceeded && <Info type="success">Succeeded</Info>}
        {resetPasswordData && (
          <Info type="success">Password reset successfuly</Info>
        )}
        {sendLinkData && (
          <Info type="success">Reset link sent to your email address</Info>
        )}
        {resetPasswordLoading || sendLinkLoading ? <SimpleLoading /> : null}
        <Button
          type="submit"
          width="100%"
          label={!hasToken ? "Send reset link" : "Reset"}
        />
      </form>
      <div className="forgot-password-container">
        <Link
          className="back-to-login-link"
          to="/">
          Back to login?
        </Link>
      </div>
    </div>
  );
}
