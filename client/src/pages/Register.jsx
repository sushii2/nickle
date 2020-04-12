import React from "react";
import { connect } from "react-redux";
import { setAlert } from "../actions/alert";
import { register } from "../actions/auth";
import {
  Flex,
  useColorMode,
  Stack,
  FormControl,
  FormHelperText,
  InputGroup,
  InputLeftAddon,
  Divider,
  Button,
  Icon,
  Input,
  FormErrorMessage,
} from "@chakra-ui/core";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Register = ({ setAlert, register }) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "black" };
  const textColor = { light: "black", dark: "white" };
  return (
    <Flex
      justify="center"
      align="center"
      w="100%"
      h="93vh"
      bg={bgColor[colorMode]}
      color={textColor[colorMode]}
    >
      <Formik
        initialValues={{
          name: "",
          username: "",
          email: "",
          password: "",
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .max(60, "Please enter no more than 60 characters")
            .required("Name is required"),
          username: Yup.string()
            .max(30, "Please enter no more than 30 characters")
            .required("Username is required"),
          email: Yup.string()
            .email("Email is invalid")
            .required("Email is required"),
          password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
        })}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 1000);
          const { name, username, email, password } = values;
          register({ name, username, email, password });
          setAlert("Successfully registered", "success");
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Stack spacing={5}>
              <Field name="name">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.name && form.touched.name}
                  >
                    <InputGroup>
                      <InputLeftAddon children={<Icon name="info" />} />
                      <Input
                        {...field}
                        type="text"
                        placeholder="Full Name"
                        aria-label="Full Name"
                      />
                    </InputGroup>
                    <FormErrorMessage name="name">
                      {form.errors.name}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="username">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.username && form.touched.username}
                  >
                    <InputGroup mt={3} mb={3}>
                      <InputLeftAddon children={<Icon name="at-sign" />} />
                      <Input
                        {...field}
                        type="text"
                        placeholder="Username"
                        aria-label="Username"
                      />
                    </InputGroup>
                    <FormErrorMessage name="username">
                      {form.errors.username}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Divider borderColor="gray.400" />
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <InputGroup>
                      <InputLeftAddon children={<Icon name="email" />} />
                      <Input
                        {...field}
                        type="email"
                        placeholder="Email"
                        aria-label="Email"
                      />
                    </InputGroup>
                    <FormErrorMessage name="email">
                      {form.errors.email}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <InputGroup mt={3} mb={3}>
                      <InputLeftAddon children={<Icon name="lock" />} />
                      <Input
                        {...field}
                        type="password"
                        placeholder="Password"
                        aria-label="Password"
                      />
                    </InputGroup>
                    <FormErrorMessage name="password">
                      {form.errors.password}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Divider borderColor="gray.400" />
              <Button
                boxShadow="sm"
                _hover={{ boxShadow: "md" }}
                _active={{ boxShadow: "lg" }}
                isLoading={props.isSubmitting}
                type="submit"
              >
                Register
              </Button>
              <FormHelperText textAlign="center" mt={0}>
                Already have an account?<Link to="/login"> Click here.</Link>
              </FormHelperText>
            </Stack>
          </form>
        )}
      </Formik>
    </Flex>
  );
};

Register.popTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, register })(Register);
