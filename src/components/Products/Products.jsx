import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import cargando from "../../assets/img/cargando.gif";
import { db } from "../../config/firebaseConfig";
import { ItemList } from "../ItemList/ItemList";
import{ItemDetail} from "../ItemDetail/ItemDetail"
import { sembrador } from "../Sembrador/Sembrador";



export const Products = ({cat}) => {
  const [products, setProducts] = useState([]);

  const getProductBD = (category) => {
    
     const myProducts = category
      ? query(
          collection(db, "products"),
          where( "category", "==", cat)
        )
      : query(collection(db, "products"));

    getDocs(myProducts)
      .then((resp) => {
    
        const productList = resp.docs.map((doc) => {
          const product = {
            id: doc.id,
            ...doc.data(),
          };
          setIsLoading(false);
          return product;
        });
        
        setProducts(productList);
      })

      .catch((error) => console.log(error)),
      setIsLoading(false);
      ;
  };

 
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    getProductBD(cat);
   //sembrador();
  }, [cat]);

  return (
    <>
      {isLoading ? (
        <div className="d-flex align-items-center justify-content-center">
          <img className="cargando" src={cargando} alt="cargando" />
        </div>
      ) : (
        <ItemList products={products} />
      )}

      
    </>
  );
};
