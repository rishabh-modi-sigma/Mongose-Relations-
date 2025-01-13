//order place

const addOrders = async () => {
    let res = await Order.insertMany([
           {item: "Somasa", price:12},
           {item: "Chips", price:10},
           {item: "Chocolate", price: 40}
       ]);
       console.log(res);
   };
   addOrders();


//push the order

   let order1 = await Order.findOne({item:"Chips"}); 
   let order2 = await Order.findOne({item:"Chocolate"});
   
   cust1.orders.push(order1);
   cust1.orders.push(order2);

   let result = await cust1.save();
   console.log(result);

//ONE TO ONE
const mongoose = require("mongoose");
// const {Schema} = mongoose;

main()
.then(() => console.log("connection sucessful"))
.catch((err) => console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}
 
const userSchema = new Schema({
    username: String,
    addresses:[
    {
        _id: false,
        location: String,
        city:String,
    },
],
});

const User = mongoose.model("User",userSchema);

const addUsers = async () => {
    let user1 = new User({
    username: "RishabhMoid",
    addresses:[
        {
            location: "221B Baker Street",
            city: "London",
        },
    ],
});

user1.addresses.push({location:"321B walStreet",city:"London"});
 await user1.save();

};

addUsers();




   //ONE TO MANY
   const mongoose = require("mongoose");
// const {Schema} = mongoose;

main()
.then(() => console.log("connection Succesful"))
.catch((err) => console.log(err));

async function main(){
    // await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const orderSchema = new Schema({
    item: String,
    price: Number,
});



// CustomerSchema.pre("findOneAndDelete", async () => {
//     console.log("PRE MIDDLEWARE");
// });

customerSchema.post("findOneAndDelete", async (customer) => {
 if(customer.orders.length){
let res = await Order.deleteMany({
    _id: { $in: customer.orders } });
        console.log(res);
 }
});

const Order = mongoose.model("Order",orderSchema);
const Customer = mongoose.model("Customer",customerSchema);

const addCustomer = async() =>{
  let result = await Customer.find({}).populate("orders");
  console.log(result);
};

const addCust = async () => {
    let newCust = new Customer({
    name:"Karna Arjun"
    });

    let newOrder = new Order({
       item:"Burger",
       price:250,
    });

    newCust.orders.push(newOrder)
    
    await newCust.save();
    await newOrder.save();

    console.log("added succesful");
};

    const delCust = async () => {
        let data = await Customer.findByIdAndDelete('6776a1c064edda1e6c3a8dfe');
        console.log(data);
    };

    delCust();

    //POST IS MANY

const mongoose = require("mongoose");
const {Schema} = mongoose;

main()
.then(() => console.log("Connection Succesful"))
.catch((err) => console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemotext");
}

const UserSchema = new Schema({
    username: String,
    email:String,
});

const postSchema = new Schema({
    content : String,
    likes : Number,
    User:[
    {
        type:Schema.Types.ObjectId,
        ref: "User",
      }

    ],
});

// const User = mongoose.model("User",UserSchema);
const Post = mongoose.model("Post",postSchema);

const addData = async () =>{
    let user1 = new User({
        username:"RishabhModi",
        email:"@Rishabhmodi",
    });
    
    // let post1 = new Post({
    //     content:"hello my name Sakshi Jain",
    //     likes:100,
    // });
    let post1 = new Post({
        content:"bye bye",
        likes:50,
    });
    post1.User = user1;

     await user1.save();
     await post1.save();
     
};

addData();
