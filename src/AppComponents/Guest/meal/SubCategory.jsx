import Meal from "./Meal";


const SubCategory = (props) => {
    return (
        <div>
            {props.data.meals.map((meal, index) => (
                <Meal index={index} notifySuccess={props.notifySuccess} handleAddCart={props.handleAddCart} {...props} key={index} meal={meal} />
            ))}
        </div>
    )
}

export default SubCategory;