import React, { createContext, FC, ReactElement, useContext } from "react";
import "./App.css";
import { Formik, useField } from "formik";
import { Button, Form, FormControl } from "react-bootstrap";

/**
 * Converts stateless input components into ones that inherit their name attribute from
 * a parent FormikGroup
 * @param Component An Input component to be hooked up to formik
 */
interface withValidate {
  validate?: (value: string) => string | undefined;
}
const formikify = <P extends object>(
  Component: React.FunctionComponent<P>
): React.FunctionComponent<P & withValidate> => {
  const FormikWrapper: React.FunctionComponent<P & withValidate> = (props) => {
    // Get "name" as set by parent FormikGroup
    const group = useContext(GroupContext);
    const [field, meta] = useField({ name: group.name, validate: props.validate });
    return <Component {...field} {...props} isInvalid={meta.touched && meta.error}></Component>;
  };
  return FormikWrapper;
};

/**
 * Presentational component for input layout/context
 */
const UIGroup: FC<{ label: string; error: string }> = ({ label, error, children: input }) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      {input}
      {error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
    </Form.Group>
  );
};
/**
 * A Formik wrapper for the presentational Group component. Since it has knowledge of the "name" of it's child
 * input, it can use the "name" to get the "meta" object from Formik and use it to control child Group component.
 */
const GroupContext = createContext<{ name: string }>({ name: "" });
const FormikGroup: FC<{ name: string; label: string; validate?: any }> = ({ name, label, children, validate }) => {
  const [, meta] = useField({ name, validate });
  return (
    <GroupContext.Provider value={{ name }}>
      <UIGroup error={(meta.touched && meta.error) || ""} label={label}>
        {children}
      </UIGroup>
    </GroupContext.Provider>
  );
};
//Create Formik linked inputs
const FormikText = formikify(Form.Control);
const FormikRadio = formikify(Form.Check);
function App() {
  return (
    <div className="App">
      <Formik
        initialValues={{ email: "", rad: "" }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }}
      >
        {({ handleReset, handleSubmit }) => (
          <Form onReset={handleReset} onSubmit={handleSubmit}>
            <FormikGroup
              label="Formik Email"
              name="email"
              validate={(val: string) => {
                return val.length === 0 && "Required";
              }}
            >
              <FormikText></FormikText>
            </FormikGroup>
            <FormikGroup
              label="radio"
              name="rad"
              validate={(val: string[]) => {
                if (!val.includes("B")) return "You must choose B";
              }}
            >
              <FormikRadio label="A" value="A"></FormikRadio>
              <FormikRadio label="B" value="B"></FormikRadio>
            </FormikGroup>
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;
