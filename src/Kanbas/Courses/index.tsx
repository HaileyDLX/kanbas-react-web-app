import { courses } from "../Database";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Grades from "./Grades";




function Courses() {
    const { courseId } = useParams();
    const course = courses.find((course) => course._id === courseId);

    const location = useLocation();

    // 提取路径的最后一部分
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const lastPathSegment = pathSegments[pathSegments.length - 1];
    return (
        <div>
            {/*<h3  style={{ color: '#FF0000FF' , fontWeight: 600}} ><HiMiniBars3/> Course {course?.name} </h3>*/}
            <h3 style={{color: '#FF0000FF', fontWeight: 600}}>
                <HiMiniBars3/> Course {course?.name} <span
                style={{color: '#737373'}}>{' > '}</span><span
                style={{color: '#000000'}}>{lastPathSegment}</span>
            </h3>


            <hr/>
            <CourseNavigation/>
            <div>
                <div
                    className="overflow-y-scroll position-fixed bottom-0 end-0"
                    style={{left: "320px", top: "50px"}}>
                    <Routes>
                        <Route path="/" element={<Navigate to="Home"/>}/>
                        <Route path="Home" element={<Home/>} />
                        <Route path="Modules" element={<Modules/>}/>
                        <Route path="Piazza" element={<h1>Piazza</h1>}/>
                        <Route path="Assignments" element={<Assignments/>} />

                        <Route path="Assignments/:assignmentId" element={<AssignmentEditor/>}/>

                        <Route path="Grades" element={<Grades />} />

                    </Routes>
                </div>
            </div>

        </div>
    );
}

export default Courses;