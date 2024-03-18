import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    addModule,
    deleteModule,
    updateModule,
    setModule,
} from "./reducer";
import { KanbasState } from "../../store";

function ModuleList() {
    const { courseId } = useParams();
    const moduleList = useSelector((state: KanbasState) =>
        state.modulesReducer.modules);
    const module = useSelector((state: KanbasState) =>
        state.modulesReducer.module);
    const dispatch = useDispatch();

    return (
        <ul className="list-group">
            <li className="list-group-item">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Module Name"
                        value={module.name}
                        onChange={(e) =>
                            dispatch(setModule({ ...module, name: e.target.value }))
                        }
                    />
                    <textarea
                        className="form-control m-1"
                        placeholder="Module Description"
                        value={module.description}
                        onChange={(e) =>
                            dispatch(setModule({ ...module, description: e.target.value }))
                        }
                    />
                    <div className="input-group-append m-1">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => dispatch(addModule({ ...module, course: courseId }))}
                        >
                            Add
                        </button>
                        <button
                            className="btn btn-success m-1"
                            type="button"
                            onClick={() => dispatch(updateModule(module))}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </li>
            {moduleList
                .filter((module) => module.course === courseId)
                .map((module, index) => (
                    <li key={index} className="list-group-item">
                        <button
                            className="btn btn-warning m-1"
                            onClick={() => dispatch(setModule(module))}
                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={() => dispatch(deleteModule(module._id))}
                        >
                            Delete
                        </button>
                        <h3>{module.name}</h3>
                        <p>{module.description}</p>
                    </li>
                ))}
        </ul>
    );
}

export default ModuleList;
