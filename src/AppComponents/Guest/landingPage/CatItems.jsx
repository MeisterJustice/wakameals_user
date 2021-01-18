

const CatItems = (props) => {
    return (
        <div className="pt-3">
            {props.meals.map((data, index) => (
                <div key={index}>
                    <a href={`#${data.name}${index}`} className="cat-name cursor">{data.name}</a>
                    <hr className="py-1" />
                </div>
            ))}
        </div>
    )
}

export default CatItems;