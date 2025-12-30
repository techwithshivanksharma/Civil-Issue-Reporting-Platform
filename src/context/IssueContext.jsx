import react, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

//context created
export const IssueContext = createContext();

//Provider component
export const IssueProvider = ({ children }) => {

   const { user } = useContext(AuthContext); // get logged-in user
  const [issues, setIssues] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false); //To track first load of issues

  // 🧠 Load saved issues from LocalStorage when app starts
  useEffect(() => {
    const savedIssues = localStorage.getItem("issues");

    if (savedIssues) {
      try {
        setIssues(JSON.parse(savedIssues));
      } catch (e) {
        console.error("Error parsing issues: ", e);
      }
    }
    setIsInitialized(true); //Mark that loading is done
  }, []);

  // 💾 Save issues to LocalStorage whenever they change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("issues", JSON.stringify(issues));
    }
  }, [issues, isInitialized]);

  //function to add new Issue
  const addIssue = (issue) => {
    const issueWithMeta = {
      ...issue,
      ownerId: user.id,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    setIssues((prev) => [...prev, issueWithMeta]);
  };

  const getVisibleIssues = () => {
    if (!user) return [];

    if (user.role === "admin") {
      return issues;
    }

    //Users will see only their own Issues.
    return issues.filter((it) => it.ownerId === user.id);
  };

  const updateIssueStatus = (id, status) => {
    setIssues((prev) =>
      prev.map((it) => (String(it.id) === String(id) ? { ...it, status } : it))
    );
  };

  const getIssueById = (id) => {
    const issue = issues.find((it) => String(it.id) === String(id));
    if (!issue) return null;

    //Admin can access any issue
    if (user?.role === "admin") return issue;

    return issue.ownerId === user?.id ? issue : null;
  };

  const deleteIssue = (id) => {
    setIssues((prev) => prev.filter((it) => String(it.id) !== String(id)));
  };

  return (
    <IssueContext.Provider
      value={{ issues, addIssue, updateIssueStatus, getIssueById, getVisibleIssues, deleteIssue }}
    >
      {children}
    </IssueContext.Provider>
  );
};
