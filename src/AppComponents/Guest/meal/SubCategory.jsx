import Meal from "./Meal";


const SubCategory = (props) => {
    return (
        <div>
            {props.data.meals.length > 0 && (
                <h6 className="cat-title">{props.data.name}</h6>
            )}
            {props.data.meals.map((meal, index) => (
                <Meal index={index} notifySuccess={props.notifySuccess} handleAddCart={props.handleAddCart} {...props} key={index} meal={meal} />
            ))}
        </div>
    )
}

export default SubCategory;