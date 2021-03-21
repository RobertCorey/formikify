import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Formik, useField } from "formik";
import { Button, Form } from "react-bootstrap";

const FKText = () => {
  const [field] = useField({ name: "email" });
  return <Form.Control {...field}></Form.Control>;
};

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
            <Button type="submit">Fukc</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;
