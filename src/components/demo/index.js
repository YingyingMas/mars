import React from "react";
import "./index.css"
import DemoParent from "./demo-parent";
import NumAdd from "./num-add"
import FilterableProductTable from "./reverse-data-flow"

function Demo() {
    const PRODUCTS = [
        { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
        { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
        { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
        { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
        { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
        { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
      ];
    return (
        <div className="Demo">
            <DemoParent></DemoParent>
            <FilterableProductTable products={PRODUCTS} />
            <NumAdd></NumAdd>
        </div>
    );
}

export default Demo;
