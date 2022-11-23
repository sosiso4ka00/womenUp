const { Todo } = require("../entites/todo")

module.exports.get = async (req, res) => {
    const { limit, offset } = req.query;
    const user = req.user

    const todos = await Todo.find({ creator: user.id }).limit(limit).skip(offset).select("-creator -__v")

    res.json(todos)
}

module.exports.create = async (req, res) => {
    const { title } = req.body
    const user = req.user

    const todo = await Todo.create({
        title,
        creator: user.id,
    })

    res.json({
        _id: todo._id,
        title: todo.title,
        marked: todo.marked
    })

}


module.exports.update = async (req, res) => {
    const { id } = req.params
    const user = req.user
    const { title, marked } = req.body
    
    const todo = await Todo.findOne({ _id: id })
    if(!todo) return res.status(400).json({error: "todo not found"})

    if(todo.creator.toString() != user.id)  return res.status(401).json({error: "access denied"})

    await Todo.updateOne({_id: id}, {
        title,
        marked
    })

    res.json({
        _id: id,
        title: title !== undefined ? title : todo.title,
        marked: marked !== undefined ? marked : todo.marked
    })

}

module.exports.delete = async (req, res) => {
    const { id } = req.params
    const user = req.user
    
    const todo = await Todo.findOne({ _id: id })
    if(!todo) return res.status(400).json({error: "todo not found"})

    if(todo.creator.toString() != user.id)  return res.status(401).json({error: "access denied"})

    await todo.delete()

    res.json({
        message: "success"
    })
    
}