import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { assignments } from "../../../Database";
import "./index.css";
import { KanbasState } from "../../../store";
import {addAssignment, updateAssignment, setAssignment} from "../reducer";
import {useDispatch, useSelector} from "react-redux";
function AssignmentEditor() {
    const { courseId, assignmentId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const globalAssignments = useSelector((state: KanbasState) => state.assignmentsReducer.assignments);
    // Using local state for form control, initializing with a default structure
    const [localAssignment, setLocalAssignment] = useState({
        title:"new assignments",
        description:"assignments description",
        points:"100",
        dueDate:"2023-09-10",
        availableFromDate:"2023-10-10",
        availableUntilDate:"2023-10-10"
    });

    useEffect(() => {
        if (assignmentId === 'new') {
            // Reset or set defaults for a new assignment
            setLocalAssignment({
                title:"new assignments",
                description:"assignments description",
                points:"100",
                dueDate:"2023-09-10",
                availableFromDate:"2023-10-10",
                availableUntilDate:"2023-10-10"
            });
        } else {
            // Find and set the existing assignment for editing
            const assignmentToEdit = globalAssignments.find(a => a._id === assignmentId);
            if (assignmentToEdit) {
                setLocalAssignment(assignmentToEdit);
            }
        }
    }, [assignmentId, globalAssignments]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setLocalAssignment(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };



    const handleSave = () => {
        const action = assignmentId === 'new' ? addAssignment : updateAssignment;
        dispatch(action({ ...localAssignment, course: courseId }));
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
            <input
                name="title"
                value={localAssignment.title}
                onChange={handleChange}
                className="form-control mb-2"
            />


            <textarea
                name="description"
                className="form-control"
                value={localAssignment.description}
                onChange={handleChange}
            />
            <br/>

            <div className="d-flex col-md-6">
                <label className="p-2" htmlFor="points">Points</label>
                <input
                    name="points"
                    value={localAssignment.points}
                    onChange={handleChange}
                    className="form-control"
                    id="points"
                />
            </div>

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
                    <input name="dueDate" value={localAssignment.dueDate}
                           onChange={handleChange} className="form-control" type="date"/>
                    <br/>
                </div>

                <div className="form-group">
                    <div className="row">
                        <div className="col-md-4">
                            <label>Available from</label><br/>
                            <input name="availableFromDate" value={localAssignment.availableFromDate}
                                   onChange={handleChange}
                                   className="form-control" type="date"
                            />
                            <br/>
                        </div>

                        <div className="col-md-4">
                            <label>Until</label><br/>
                            <input name="availableUntilDate" value={localAssignment.availableUntilDate}
                                   onChange={handleChange} className="form-control" type="date"
                            />
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
                <button className="btn btn-success pull-right m-2"
                        onClick={handleSave}>
                    save
                </button>
            </div>
        </div>
    );
}


export default AssignmentEditor;