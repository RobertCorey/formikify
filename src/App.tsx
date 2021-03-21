import React from "react";
import "./App.css";
import { Formik, useField } from "formik";
import { Button, Form } from "react-bootstrap";

const formikify = (Component: React.FunctionComponent) => {
  const FormikWrapper = (props: any) => {
    const [field] = useField({ name: "email" });
    return <Component {...field} {...props}></Component>;
  };
  return FormikWrapper;
};

const UIText = (props: any) => <Form.Control {...props} />;
const FKText = formikify(UIText);

function App() {
  return (
    <div className="App">
      <Formik
        initialValues={{ email: "rob@poo.com" }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, handleReset, handleSubmit }) => (
          <Form onReset={handleReset} onSubmit={handleSubmit}>
            <Form.Group>
              <FKText></FKText>
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;
