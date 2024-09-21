const Product = require('../models/products')


const getAllProducts = async (req, res) => {
    const {name, featured, company, sort, fields, numericFilter} = req.query;
    const queryObj = {}
    if (featured) queryObj.featured = featured
    if (company) queryObj.company = company
    if (name) queryObj.name = {$regex: name, $options: 'i'}
    if (numericFilter) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        };
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        const options = ['price', 'rating']
        let filters = numericFilter.replace(regEx, (match) => `-${operatorMap[match]}-`)
        filters.split(',').forEach((command) => {
            const [field, operator, value] = command.split('-');
            if (options.includes(field)) {
                queryObj[field] = {[operator]: Number(value)}
            }
        })
    }

    let result = Product.find(queryObj);
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result.sort(sortList)
    } else {
        result.sort('createdAt')
    }

    if (fields) {
        const fieldList = fields.split(',').join(' ');
        result.select(fieldList)
    }
    const limit = Number(req.query.limit) || 10
    const page = Number(req.query.page) || 1
    result.limit(limit).skip(limit * (page - 1))

    const products = await result;

    res.status(200).json({counter: products.length, products})
}

module.exports = {
    getAllProducts
}