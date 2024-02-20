import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { assignments } from "../../../Database";
import "./index.css";
function AssignmentEditor() {
    const { assignmentId } = useParams();
    const assignment = assignments.find(
        (assignment) => assignment._id === assignmentId);
    const { courseId } = useParams();
    const navigate = useNavigate();
    const handleSave = () => {
        console.log("Actually saving assignment TBD in later assignments");
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    };
    return (

        <div>

            <div className="container">
                <div className="row mt-3">
                    <div className="col-md-2">
                        <select className="form-control">
                            <option>Speed Grader</option>
                        </select>
                    </div>
                </div>
            </div>


            <hr/>
            <h4>Assignment Name</h4>
            <input value={assignment?.title}
                   className="form-control mb-2"/>

            <textarea className="form-control"
                      value={"This is the assignment description: An Assignment describes the task or project requirements, guiding individuals on what needs to be accomplished. It serves as a directive outlining expectations and objectives for successful completion."}/>
            <br/>
            <div className="row">
                <div className="d-flex col-md-6">
                    <label className="p-2" htmlFor="points">Points</label>
                    <input className="form-control" id="points" value="100"/>
                </div>
            </div>
            <br/>

            <div className="row">
                <div className="d-flex col-md-6">
                    <label className="p-2">Assignment Group</label>
                    <select className="form-control">
                        <option>ASSIGNMENT</option>
                        <option>QUIZ</option>
                        <option>EXAM</option>
                        <option>PROJECT</option>
                    </select>
                </div>
            </div>

            <br/>
            <br/>
            <label className="p-2">Online Entry Options</label><br/>
            <label><input type="checkbox" name="online-entry-options"/>Text Entry</label><br/>
            <label><input type="checkbox" name="online-entry-options"/>Website URL</label><br/>
            <label><input type="checkbox" name="online-entry-options"/>Media Recording</label><br/>
            <label><input type="checkbox" name="online-entry-options"/>Student
                Annotations</label><br/>
            <br/>
            <br/>


                <legend className="pull-left col-auto p-2">Assign</legend>
                <fieldset className="col-md-8 fieldset">
                    <div className="form-group">
                        <label htmlFor="assign">Assign to</label><br/>
                        <input className="form-control" id="assign" defaultValue="Everyone"/>
                        <br/>
                    </div>

                    <div className="form-group">
                        <label>Due Date</label><br/>
                        <input className="form-control" type="date" defaultValue="2020-09-01"/>
                        <br/>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-4">
                                <label>Available from</label><br/>
                                <input className="form-control" type="date"
                                       defaultValue="2020-09-01"/>
                                <br/>
                            </div>

                            <div className="col-md-4">
                                <label>Until</label><br/>
                                <input className="form-control" type="date"
                                       defaultValue="2020-09-01"/>
                                <br/>
                            </div>
                        </div>
                    </div>
                </fieldset>


            <div className="d-flex justify-content-center">
            <Link to={`/Kanbas/Courses/${courseId}/Assignments`}
                  className="btn btn-danger pull-right m-2">
                Cancel
            </Link>
            <button onClick={handleSave} className="btn btn-success pull-right m-2">
                Save
            </button></div>
        </div>
    );
}

export default AssignmentEditor;