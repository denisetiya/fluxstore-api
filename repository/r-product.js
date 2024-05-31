const prisma = require("../utils/prisma.js")

const getAllProduct = async () => {
  return await prisma.product.findMany({
    include: {
      productDetails: {
        include: {
          sizes: true
        }
      }
    }
  });
};


const getProductById = async (id) => {

  return await prisma.product.findUnique({
    where: {
      id
    },
    include: {
      productDetails: {
        include: {
          sizes: true
        }
      }
    }
  });

}

const createProduct = async (data) => {
  const { nameProduct, priceProduct, descProduct, starProduct, idSubCategory, discountProduct, gender, recommendedProduct,comments, detail,sizes} = data;

  // Buat Product baru
  const newProduct = await prisma.product.create({
    data: {
      nameProduct,
      priceProduct,
      descProduct,
      starProduct,
      discountProduct,
      idSubCategory,
      gender,
      recommendedProduct
    }
  });

  const productId = newProduct.id;


  for (let item of detail) {
    const newProductDetail = await prisma.productDetail.create({
      data: {
        idProduct: productId,
        colorProduct: item.color,
        pictureProduct: item.picture
      }
    });

    for (let size of sizes) {
      await prisma.size.create({
        data: {
          idProductDetail: newProductDetail.id,
          sizeProduct: size.size,
          stockProduct: size.stock
        }
      });
    }
  }

  // for (let comment of comments) {
  //   await prisma.comment.create({
  //     data: {
  //       idProduct: productId,
  //       idUser: comment.idUser,
  //       rating : comment.rating,
  //       comment: comment.comment
  //     }
  //   });
  // }

  return newProduct;
}





const deleteProduct = async (id) => {
  
  await prisma.productDetail.deleteMany({
    where: {
      idProduct: id
    }
  })

  return await prisma.product.delete({
    where: {
      id
    }
  });

}

const deleteDetailProduct = async (id) => {
  
  return await prisma.productDetail.delete({
    where: {
      id
    }
  });
  
}

const updateProduct = async (id, data) => {


  if (data.productDetail[0].id && Array.isArray(data.productDetail)) {
    data.productDetail.forEach(async (detail) => {
  
      if (detail.id) {
        const productDetailData = ['id', 'stockProduct', 'colorProduct', 'pictureProduct'].reduce((acc, key) => {
          if (detail[key] !== undefined) {
            acc[key] = detail[key];
          }
          return acc;
        }, {});

        await prisma.productDetail.update({
          where: {
            id: detail.id 
          },
          data: productDetailData
        });
      }
    });
  }
  
  const productData = ['nameProduct', 'priceProduct', 'descProduct', 'starProduct', 'categoryProduct', 'gender', 'rekomendedProduct'].reduce((acc, key) => {
    if (data[key] !== undefined) {
      acc[key] = data[key];
    }
    return acc;
  }, {});

  return await prisma.product.update({
    where: {
      id
    },
    data: productData,
    include: {
      productDetail: true
    }
  });
};


module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteDetailProduct
}