"use client";

import React from "react";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import { signUp } from "@/lib/auth-client";

const Signuppage = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    console.log("Form data:", data);

    const { data: resData, error } = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (error) {
      console.error("Signup failed:", error);
      console.error("Error message:", error.message);
      console.error("Error status:", error.status);
      console.error("Error code:", error.code);
      return;
    }

    console.log("Signup successful:", resData);
  };

  return (
    <div>
      <h2>Please Sign Up</h2>

      <Form
        className="flex w-96 flex-col gap-4"
        render={(props) => <form {...props} />}
        onSubmit={onSubmit}
      >
        {/* Name */}
        <TextField
          isRequired
          name="name"
          validate={(value) => {
            if (value.length < 3) {
              return "Name must be at least 3 characters";
            }

            return null;
          }}
        >
          <Label>Name</Label>

          <Input placeholder="John Doe" />

          <FieldError />
        </TextField>

        {/* Email */}
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }

            return null;
          }}
        >
          <Label>Email</Label>

          <Input placeholder="john@example.com" />

          <FieldError />
        </TextField>

        {/* Password */}
        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }

            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }

            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }

            return null;
          }}
        >
          <Label>Password</Label>

          <Input placeholder="Enter your password" />

          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>

          <FieldError />
        </TextField>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button type="submit">Submit</Button>

          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Signuppage;
