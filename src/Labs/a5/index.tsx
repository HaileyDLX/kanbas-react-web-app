import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';



function Assignment5() {

    function Acme() {
        const [q, p] = useState({ w: "C", o: 25 });
        const e = () => {
            p({ ...q, w: "K" });
        };
        const u = (r:number) => {
            p({ ...q, o: r });
        };
        return (
            <div>
                <h3>G: {q.w}</h3>
                <h3>Y: {q.o}</h3>
                <button onClick={e}>M</button>
                <button onClick={() => u(30)}>H</button>
            </div>
        );
    }


    function Def() {
        const { v, t } = useParams(); // __8__ = v, __9__ = useParams


        return (
            <div>
                {v} x {t} = {parseInt(v as string) * parseInt(t as string)}
            </div>
        );
    }


    return (

                <div>
                    <Link to="a/3/5">Def</Link> {/* __1__ = Link, __2__ = 3, __3__ = Link */}
                    <Routes>
                        <Route path="a/:v/:t" element={<Def />} /> {/* __4__ = Route, __5__ = t, __6__ = element, __7__ = Def, __12__ = path */}
                    </Routes>
                    <Acme />
                </div>


    );
}

export default Assignment5;