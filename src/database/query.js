export const queries = {
    getAllProduct:'SELECT * FROM product',
    createNewProduct:'INSERT INTO product (sku,id_categoria,name,price,stock) VALUES (@sku,@id_categoria,@name,@price,@stock)',
    getProductById:'SELECT * FROM product WHERE sku = @sku ',
    deleteById:'delete FROM product WHERE sku = @sku ',
    updateProducts:'update product SET id_categoria=@id_categoria,name=@name,price=@price,stock=@stock where sku=@sku'
}