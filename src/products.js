export const products = [
  {
    id: "1",
    brand: "Celular Samsung",
    model:"KM45G",
    price: "1500",
    category: "celular",
    img: "https://images.samsung.com/is/image/samsung/p6pim/ar/sm-a245mzkoaro/gallery/ar-galaxy-a24-sm-a245-sm-a245mzkoaro-thumb-536812898?$344_344_PNG$",
    stock: 10,
    description: "Descripción de Samsung",
  },
  {
    id: "2",
    brand: "Celular Iphone 18",
    model:"S873NGF",
    price: "3000",
    category: "celular",
    img: "https://http2.mlstatic.com/D_NQ_NP_712176-MLA49534079470_032022-O.webp",
    stock: 8,
    description: "Descripción de Iphon 18",
  },
  {
    id: "3",
    brand: "Celular LG",
    model:"KK23R",
    price: "1100",
    category: "celular",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjspYfzIt4SHwFpiFmAa-k3MMpXKZpjM6y9A&s",
    stock: 21,
    description: "Descripción de LG",
  },
  {
    id: "4",
    brand: "Notebook Lenovo",
    model:"99FF9F",
    price: "1500",
    category: "notebook",
    img: "https://fullh4rd.com.ar/img/productos/32/notebook-lenovo-156-thinkbook-i51135g7-8gb-256gb-free-0.jpg",
    stock: 10,
    description: "Descripción de Notebook Lenovo",
  },
  {
    id: "5",
    brand: "Notebook Asus",
    model:"KMASD3",
    price: "3000",
    category: "notebook",
    img: "https://fullh4rd.com.ar/img/productos/32/notebook-asus-156-vivobook-f1500e-i51135g7-8gb-256gb-fhd-w11h-ingles-0.jpg",
    stock: 8,
    description: "Descripción de Notebook  Asus",
  },
  {
    id: "6",
    brand: "Notebook HP",
    model:"KM43G",
    price: "1100",
    category: "notebook",
    img: "https://www.venex.com.ar/products_images/1688041087_1.png",
    stock: 21,
    description: "Descripción de Notebook HP",
  },
  {
    id: "7",
    brand: "Tablet Samsung",
    model:"SDF98N",
    price: "1500",
    category: "tablet",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvpFQ2hnql2rtzz3TtArAXDOnogf53j9iyiQ&s",
    stock: 10,
    description: "Descripción de tablet Samsung",
  },
  {
    id: "8",
    brand: "Tablet Asus",
    model:"98DFN",
    price: "3000",
    category: "tablet",
    img: "https://http2.mlstatic.com/D_NQ_NP_685192-MLA52680401803_122022-O.webp",
    stock: 8,
    description: "Descripción de tablet Asus",
  },
  {
    id: "9",
    brand: "Tablet Exo",
    model:"SDF324",
    price: "1100",
    category: "tablet",
    img: "https://http2.mlstatic.com/D_907890-MLA69977433151_062023-C.jpg",
    stock: 21,
    description: "Descripción de tablet Exo",
  },
];

export const carts = [{
}]

export const getProductsFn = () => {
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            res(products)
        },2000)
    })
};

export const getProductsByIdFn = (id) => {
  return new Promise((res,rej)=>{
      setTimeout(()=>{
        const getProductById = products.find((product)=> product.id === id)
          res(getProductById)
      },0)
  })
};

export const getProductsByCategoryFn = (category) => {
  return new Promise((res,rej)=>{
      setTimeout(()=>{
        const getProductByCategory = products.filter((product)=> product.category === category)
          res(getProductByCategory)
          rej("Esa categoria no existe")
      },0)
  })
};
