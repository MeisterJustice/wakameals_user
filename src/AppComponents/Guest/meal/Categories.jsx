
import SubCategory from './SubCategory';
 

const Categories = (props) => {
    return (
            <div id={`${props.data.name}${props.index}`} className="mt-3 mx-lg-5">
                <h5 className="cat-title">{props.data.name}</h5>
                {props.data.subcategories.map((data, index) => (
                    <div key={index}>
                        <SubCategory notifySuccess={props.notifySuccess} handleAddCart={props.handleAddCart} {...props} data={data} />
                    </div>
                ))}
            </div>
        
    )
}

export default Categories