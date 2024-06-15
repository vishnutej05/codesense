import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ModuleCards from "../ModuleCards";
import "./index.css";

const ModulesPage = () => {
  const { id, title } = useParams();

  const [modules, setModules] = useState({});

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch(
          // `http://13.201.156.87:8800/fetch/course/${id}`
          `http://localhost:8800/fetch/course/${id}`
        );

        const data = await response.json();
        setModules(data);
        console.log("Mdoules are: ", data);
      } catch (error) {
        console.log("Error Fetching Modules", error);
      }
    };

    fetchModules();
  }, []);

  return (
    <div className="modules-container">
      <h2 className="course-title">{title}</h2>
      {/* {modules.modules &&
        modules.modules.map((each) => (
          <ModuleCards key={each._id} module={each} courseId={id}/>
        ))} */}
        {modules.modules &&
      
      <ModuleCards  modules={modules.modules} courseId={id}/>

}
    </div>
  );
};

export default ModulesPage;
