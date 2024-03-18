import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { assignments } from "../../../Database";
import "./index.css";
import { KanbasState } from "../../../store";
import {addAssignment, updateAssignment, setAssignment} from "../reducer";
import {useDispatch, useSelector} from "react-redux";
function AssignmentEditor() {
    const {courseId, assignmentId} = useParams();
    const assignments = useSelector((state: KanbasState) => state.assignmentsReducer.assignments);
    const assignment = useSelector((state: KanbasState) => state.assignmentsReducer.assignment);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const globalAssignments = useSelector((state: KanbasState) => state.assignmentsReducer.assignments);

    useEffect(() => {
        if (assignmentId !== 'new' && !assignment) {
            // This assumes you have a way to find an assignment by its ID in your global state
            // or you might need to fetch it here if it's not already in the global state
            const assignmentToEdit = assignments.find(a => a._id === assignmentId);
            if (assignmentToEdit) {
                dispatch(setAssignment(assignmentToEdit));
            }
        }
    }, [assignmentId, dispatch, assignments, assignment]);
    const handleSave = () => {
        if (assignmentId === 'new') {
            // Assuming addAssignment action creator properly handles adding the assignment
            dispatch(addAssignment({...assignment, course: courseId}));
        } else {
            // Assuming updateAssignment action creator properly handles updating the assignment
            dispatch(updateAssignment(assignment));
        }
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
                value={assignment.title}
                onChange={(e) =>
                    dispatch(setAssignment({...assignment, title: e.target.value}))
                } className="form-control mb-2"/>


            <textarea
                className="form-control"
                value={assignment.description}
                onChange={(e) =>
                    dispatch(setAssignment({...assignment, description: e.target.value}))
                }/>

            <br/>

            <div className="row">
                <div className="d-flex col-md-6">
                    <label className="p-2" htmlFor="points">Points</label>
                    <input value={assignment.points}
                           onChange={(e) =>
                               dispatch(setAssignment({...assignment, points: e.target.value}))
                           } className="form-control" id="points"/>
                </div>
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
                    <input value={assignment.dueDate}
                           onChange={(e) =>
                               dispatch(setAssignment({...assignment, dueDate: e.target.value}))
                           } className="form-control" type="date"/>
                    <br/>
                </div>

                <div className="form-group">
                    <div className="row">
                        <div className="col-md-4">
                            <label>Available from</label><br/>
                            <input value={assignment.availableFromDate}
                                   onChange={(e) =>
                                       dispatch(setAssignment({
                                           ...assignment,
                                           availableFromDate: e.target.value
                                       }))
                                   }
                                   className="form-control" type="date"
                            />
                            <br/>
                        </div>

                        <div className="col-md-4">
                            <label>Until</label><br/>
                            <input value={assignment.availableUntilDate}
                                   onChange={(e) =>
                                       dispatch(setAssignment({
                                           ...assignment,
                                           availableUntilDate: e.target.value
                                       }))
                                   } className="form-control" type="date"
                            />
                            <br/>
                        </div>
                    </div>
                </div>
            </fieldset>




            {/*<button*/}
            {/*    onClick={() => dispatch(updateAssignment(assignment))}>*/}
            {/*    Update*/}
            {/*</button>*/}

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