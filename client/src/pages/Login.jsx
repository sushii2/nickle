import React from "react";
import {
  Flex,
  useColorMode,
  Stack,
  FormControl,
  InputGroup,
  InputLeftAddon,
  Icon,
  Input,
  FormErrorMessage,
  Button,
  FormHelperText
} from "@chakra-ui/core";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { Link } from 'react-router-dom';

const Login = () => {
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
          email: "",
          password: "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Email is invalid")
            .required("Email is required"),
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        })}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Stack spacing={5}>
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
              <Button
                boxShadow="sm"
                _hover={{ boxShadow: "md" }}
                _active={{ boxShadow: "lg" }}
                isLoading={props.isSubmitting}
                type="submit"
              >
                Sign In
              </Button>
              <FormHelperText textAlign="center" mt={0}>
                Don't have an account?<Link to="/register"> Click here.</Link>
              </FormHelperText>
            </Stack>
          </form>
        )}
      </Formik>
    </Flex>
  );
};

export default Login;
