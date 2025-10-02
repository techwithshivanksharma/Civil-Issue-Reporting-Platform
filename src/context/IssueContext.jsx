import react, { createContext, useState } from "react";

//context created
export const IssueContext = createContext();

//Provider component
export const IssueProvider = ({ children }) => {
  const [issues, setIssues] = useState([]);

  //function to add new Issue
  const addIssue = (issue) => {
    setIssues([...issues, issue]);
  };

  return (
    <IssueContext.Provider value={{ issues, addIssue }}>
      {children}
    </IssueContext.Provider>
  );
};
