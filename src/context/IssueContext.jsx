import react, { createContext, useState, useEffect } from "react";

//context created
export const IssueContext = createContext();

//Provider component
export const IssueProvider = ({ children }) => {
  const [issues, setIssues] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false); //To track first load of issues

  // 🧠 Load saved issues from LocalStorage when app starts
  useEffect(() => {
    const savedIssues = localStorage.getItem("issues");
  
    if (savedIssues) {
      try {
        setIssues(JSON.parse(savedIssues));
      } catch (e) {
        console.error("Error parsing issues: ",e);
      }
    }
    setIsInitialized(true); //Mark that loading is done
  }, []);

  // 💾 Save issues to LocalStorage whenever they change
  useEffect(() => {
    if(isInitialized){
      localStorage.setItem("issues", JSON.stringify(issues));
    }
  }, [issues,isInitialized]);

  //function to add new Issue
  const addIssue = (issue) => {
    const issueWithMeta = {
      ...issue,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    setIssues((prev) => [...prev, issueWithMeta]);
  };

  const updateIssueStatus = (id, status) => {
    setIssues((prev) =>
      prev.map((it) => (String(it.id) === String(id) ? { ...it, status } : it))
    );
  };

  const getIssueById = (id) => {
    return issues.find((it) => String(it.id) === String(id));
  };

  const deleteIssue = (id) => {
    setIssues((prev) => prev.filter((it) => String(it.id) !== String(id)));
  };

  return (
    <IssueContext.Provider
      value={{ issues, addIssue, updateIssueStatus, getIssueById, deleteIssue }}
    >
      {children}
    </IssueContext.Provider>
  );
};
