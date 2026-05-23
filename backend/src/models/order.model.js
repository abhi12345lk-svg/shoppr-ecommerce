import mongoose from "mongoose";

const orderSchema=new mongoose.Schema(

{

userId:{

type:String,

required:true

},

items:[

{

product:{

type:mongoose.Schema.Types.ObjectId,

required:true,

ref:"product"

},

quantity:{

type:Number,

required:true

},

size:{

type:String,

required:true

}

}

],

amount:{

type:Number,

required:true

},

address:{

type:Object,

required:true

},

status:{

type:String,

default:"Order Placed"

},

paymentMethod:{

type:String,

required:true,

default:"COD"

},

isPaid:{

type:Boolean,

required:true,

default:false

},

paidAt:{

type:Date

},

deliveredAt:{

type:Date

},

stripeSessionId:{

type:String

}

},

{

timestamps:true

}

);

const orderModel=

mongoose.models.order ||

mongoose.model(

"order",

orderSchema

);

export default orderModel;
