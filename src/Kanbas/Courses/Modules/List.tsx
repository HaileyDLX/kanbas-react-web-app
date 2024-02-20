import React, { useState } from "react";
import "./index.css";
import { modules } from "../../Database";
import {FaEllipsisV, FaCheckCircle, FaPlusCircle, FaTachometerAlt} from "react-icons/fa";
import { useParams } from "react-router";
import { FaEllipsisVertical } from "react-icons/fa6";

function ModuleList() {
    const { courseId } = useParams();
    const modulesList = modules.filter((module) => module.course === courseId);
    const [selectedModule, setSelectedModule] = useState(modulesList[0]);
    return (
        <>
            {/* <!-- Add buttons here --> */
                <div className="row">
                    <div className="col text-right mt-2">
                        <button type="button"
                                className="btn btn-outline-secondary m-1 float-right">Collapse
                            All
                        </button>

                        <button type="button"
                                className="btn btn-outline-secondary m-1 float-right">View
                            Progress
                        </button>

                        <button type="button"
                                className="btn btn-outline-secondary m-1 float-right">Publish
                            All
                        </button>


                        <button type="button" className="btn btn-danger m-1 float-right">+
                            Module
                        </button>

                        <button type="button" className="btn btn-outline-secondary m-1 float-right">
                            <FaEllipsisVertical className="fs-5"/>
                        </button>
                    </div>
                </div>
            }
            <hr/>


            <ul className="list-group wd-modules">
                {modulesList.map((module) => (
                    <li
                        className="list-group-item"
                        onClick={() => setSelectedModule(module)}>
                        <div>
                            <FaEllipsisV className="me-2"/>
                            {module.name}
                            <span className="float-end">
                <FaCheckCircle className="text-success"/>
                <FaPlusCircle className="ms-2"/>
                <FaEllipsisV className="ms-2"/>
              </span>
                        </div>
                        {selectedModule._id === module._id && (
                            <ul className="list-group">
                                {module.lessons?.map((lesson) => (
                                    <li className="list-group-item">
                                        <FaEllipsisV className="me-2"/>
                                        {lesson.name}
                                        <span className="float-end">
                      <FaCheckCircle className="text-success"/>
                      <FaEllipsisV className="ms-2"/>
                    </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </>
    );
}
export default ModuleList;