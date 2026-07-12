 const Logos = ({icon, name}) => {
    let Icon = icon
    return (
        <div className="flex items-center gap-3" >
           <Icon size={30} color={"gray"}/>
           <h3 className="font-poppins font-semibold text-gray-500" >{name}</h3>
        </div>
    )
 }

 export default Logos