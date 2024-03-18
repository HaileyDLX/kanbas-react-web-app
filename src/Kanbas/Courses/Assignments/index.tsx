import React, { useState } from "react";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { assignments } from "../../Database";
import { FaFileAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, deleteAssignment, updateAssignment, setAssignment } from "./reducer";
import { KanbasState } from "../../store";
import { useNavigate } from "react-router-dom";

function Assignments() {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const assignments = useSelector((state: KanbasState) => state.assignmentsReducer.assignments);
    const assignment = useSelector((state: KanbasState) => state.assignmentsReducer.assignment);
    const dispatch = useDispatch();
    const assignmentList = assignments.filter(
        (assignment) => assignment.course === courseId);
    const handleAddAssignmentClick = () => {
        navigate(`/Kanbas/Courses/${courseId}/Assignments/new`);
    };
    const handleDelete = (assignmentId: string) => {
        const isConfirmed = window.confirm("Are you sure you want to remove this assignment?");
        if (isConfirmed) {
            dispatch(deleteAssignment(assignmentId));
        }
    };


    return (
        <>
            {<div className="container mt-3">
                <div className="row">
                    <div className="col-md-3">
                        <input className="form-control" placeholder="Search for Assignment"/>
                    </div>
                    <div className="col-md-9 d-flex justify-content-end">
                        <button type="button" className="btn btn-light m-1">+ Group</button>
                        <button type="button" className="btn btn-danger m-1"
                                onClick={handleAddAssignmentClick}>
                            + Assignment
                        </button>
                        <button type="button" className="btn btn-light m-1">︙</button>

                    </div>
                </div>
            </div>}
            <hr/>
            <ul className="list-group wd-modules">
                <li className="list-group-item">
                    <div>

                        <FaEllipsisV className="me-2"/> <IoIosArrowDown/>ASSIGNMENTS
                        <span className="float-end">

              <FaCheckCircle className="text-success"/>
              <FaPlusCircle className="ms-2"/><FaEllipsisV className="ms-2"/>
            </span>

                        <span
                            className=" float-end badge rounded border border-dark text-dark fw-light"
                            style={{padding: '.5em .75em', fontSize: '0.75em'}}>
  40% of Total
</span>
                    </div>
                    <ul className="list-group">
                        {assignmentList.map((assignment) => (
                            <li className="list-group-item">


                                <FaEllipsisV className="me-2"/><FaFileAlt
                                style={{color: '#658f6d'}}/>
                                <Link
                                    to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}>{assignment.title}</Link>
                                <button className="btn btn-danger m-1 float-end"  onClick={() => handleDelete(assignment._id)}>
                                    Delete
                                </button>
                                <span className="float-end">
                  <FaCheckCircle className="text-success"/><FaEllipsisV className="ms-2"/></span>
                                <br/>

                            </li>))}
                    </ul>
                </li>
            </ul>
        </>
    );
}

export default Assignments;