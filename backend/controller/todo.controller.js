import Todo from "../model/todo.model.js"

export const createTodo = async (req,res)=>{
       const todo=new Todo({
        text:req.body.text,
        completed:req.body.completed,
        user : req.user._id,
       })
       try {
         const newTodo =await todo.save()
         res.status(201).json({message:"Todo Created",newTodo})
       } catch (error) {
         console.log(error)
         res.status(400).json({message:"Error occuring in todo creation"})
       }
}


export const getTodos= async(req, res) =>{
    try {
        const todos=await Todo.find({ user: req.user._id })
        res.status(201).json({message:"Todo Fetchedd Successfully",todos})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Error occuring in todo fetching"})
    }
}

export const updateTodo= async (req, res) => {
     
    try {
        const todo=await Todo.findByIdAndUpdate(req.params.id,req.body,{
            new : true,
        })
        res.status(201).json({message:"Todo Updated Successfully",todo})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Error occuring in todo updating"})
    }
}

export const deleteTodo= async (req, res) => {
    try {
        const todo=await Todo.findByIdAndDelete(req.params.id)
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
          }
        res.status(201).json({message:"Todo Deleted Successfully",todo})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Error occuring in todo deleting"})
    }
}