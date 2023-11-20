import mongoose from "mongoose";
import Joi from 'joi';
const salesSchema = new mongoose.Schema({
    sales: {
        type:Number,
        required: true
    }
});
const sales = mongoose.model('Sales', salesSchema);
//validate Function.
function validateSales(sales){
    const schema =Joi.object({
        sales: Joi.number().required()
    });
    return schema.validate(sales);
}

export{salesSchema,sales,validateSales};
