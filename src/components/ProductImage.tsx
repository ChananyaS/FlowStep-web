import { useState } from "react";
import productImg from "../assets/images/Product.png";
import productVectorImg from "../assets/images/Product-vector.png";

export default function ProductImage({
  className = "",
  alt = "FlowStep ankle band",
}: {
  className?: string;
  alt?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <img
      src={failed ? productVectorImg : productImg}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      draggable={false}
    />
  );
}
