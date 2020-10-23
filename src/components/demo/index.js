import React from "react";
import "./index.css"
import DemoParent from "./demo-parent";
import NumAdd from "./num-add"

function Demo() {
    return (
        <div className="Demo">
            <DemoParent></DemoParent>
            <NumAdd></NumAdd>
        </div>
    );
}

export default Demo;
