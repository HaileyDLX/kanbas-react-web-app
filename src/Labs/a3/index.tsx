import JavaScript from "./JavaScript";
import PathParameters from "./routing/PathParameters";
import Classes from "./Classes";
import Styles from "./Styles";
import ConditionalOutput from "./ConditionalOutput";
import Highlight from "./Highlight";
import Add from "./Add";
import TodoItem from "./todos/TodoItem";
import TodoList from "./todos/TodoList";


function Assignment3() {
    return (
        <div className="container-fluid">
            <h1>Assignment 3</h1>
            <TodoList/>
            <ul className={"list-group"}>
                <TodoItem todo={{done: true, title: 'Buy milk', status: 'COMPLETED'}}/>
                <TodoItem todo={{done: false, title: 'Buy bread', status: 'PENDING'}}/>
                <TodoItem todo={{done: true, title: 'Buy eggs', status: 'COMPLETED'}}/>
            </ul>
            <Add a={3} b={4} />

            <Highlight>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam
                vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.
            </Highlight>

            <ConditionalOutput/>
            <Styles/>
            <Classes/>
            <PathParameters/>
            <JavaScript/>
        </div>
    );
}
export default Assignment3;