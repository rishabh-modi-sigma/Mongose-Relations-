//ONE TO MANY

const mongoose = require("mongoose");
const {Schema} = mongoose;

main()
.then(() =>{
    console.log("custome is runing");
})
.catch((err) =>{
    console.log(err);
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const orderSchema = new Schema ({
    item:String,
    price:Number,
});

const customerSchema = new Schema ({
     name : String,
     orders:[
        {
        type: Schema.Types.ObjectId,
        ref:"Order",
        },
     ],
});

//pre
// customerSchema.pre("findOneAndDelete", async() =>{
//     console.log("PRE MIDDLEWARE");
// });
   
//post
customerSchema.post("findOneAndDelete", async(customer) =>{
  let res = await Order.deleteMany({_id: {$in: customer.orders}});
    console.log(res);
});

const Order = mongoose.model("Order",orderSchema);
const Custmer = mongoose.model("Custmer",customerSchema);

const findCustmer = async() =>{
   let res = await Custmer.find({}).populate("orders");
console.log(res[0]);
}

const newCustmer = async()=>{
    let newCust = new Custmer({
        name:"Sakshidi",
    });

    let newOrder = new Order({
        item:"pizza",
        price:150,
    });

    newCust.orders.push(newOrder);

    await newCust.save();
    await newOrder.save();

    console.log("new added Custmer");
}
    const deltecutmer = async() =>{
        let res = await Custmer.findByIdAndDelete('67850688f55c0179775e3631');
        console.log(res);
    }

deltecutmer();
















































































