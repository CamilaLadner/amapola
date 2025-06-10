import { IProduct } from "@/interfaces";

const Card: React.FC <IProduct> = ({name, price, description, image}) => {
    return (
<div className="flex flex-col items-center justify-center w-[300px] h-[380px] p-4 rounded-2xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-[0_10px_25px_rgba(234,179,8,0.5)]">
      <img src={image} alt="product image" className="w-[200px] h-[200px] object-cover rounded-lg mb-4 mix-blend-multiply"/>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
      <p className="text-lg font-bold text-black">${price}</p>
    </div>
    )
}

export default Card;