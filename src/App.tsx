import React, { useState } from "react";
// import FormContext from "./context/form-context";
import Form from "./containers/Form";
import "./styles/styles.scss";

// const testFunc = locale => () => {
//   if (locale === "en") {
//     console.log("hello.");
//   } else {
//     console.log("hola");
//   }
// };

// Set the Locale.
// const SelectLocale = ({ locale, setLocale }) => {
//   return (
//     <select value={locale} onChange={ChangeLocale(setLocale)}>
//       <option value="en">English</option>
//       <option value="es">Español</option>
//     </select>
//   );
// };

const App = () => {
  return (
    <div className="app">
      <header>
        <h2>New House</h2>
      </header>
      <Form />
    </div>
  );
};

export default App;
