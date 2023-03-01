import axios from "axios";
import React, { useState } from "react";
import { urlAccounts } from "../endpoints";
import DisplayErrors from "../utils/DisplayErrors";
import { authenticationResponse, userCredentials } from "./auth.models";
import AuthForm from "./AuthForm";

export default function Register() {
  const [errors, setErrors] = useState<string[]>([]);

  async function register(credentials: userCredentials) {
    try {
      setErrors([]);
      const response = axios.post<authenticationResponse>(
        `${urlAccounts}/create`,
        credentials
      );
      console.log(response);
    } catch (error) {
      // setErrors(error.response.data)
    }
  }

  return (
    <>
      <h3>Register</h3>
      <DisplayErrors errors={errors} />
      <AuthForm
        model={{ email: "", password: "" }}
        onSubmit={async (values) => await register(values)}
      />
    </>
  );
}
