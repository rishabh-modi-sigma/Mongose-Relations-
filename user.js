const mongoose = require("mongoose");
const {Schema} = mongoose;
 
main()
.then(() =>{
    console.log("one to one is runing");
})
.catch((err) =>{
    console.log(err);
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const userSchema = new Schema ({
    username : String,
    address:[
        {
            _id : false,
            location:String,
            city:String,
        }
    ]
});

const USE = mongoose.model("USE",userSchema);

const addUsers = async() =>{
    let user1 = new USE({
        username : "Rishabh Modi",
        address:[
        {
            location:" 22,b Baker street",
            city:"Chani",
        },
        ],
     });
     user1.address.push({location:"23,c street",city:"Bangalore"});
    let result = await user1.save();
    console.log(result);
    }

    addUsers();





















































































































