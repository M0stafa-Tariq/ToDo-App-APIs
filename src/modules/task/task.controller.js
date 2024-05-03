import Task from "../../../DB/models/task.model.js";
import User from "../../../DB/models/user.model.js";

//========================add task with status========================//
export const addTask = async (req, res, next) => {
  const userIDFromToken = req.payload.id;
  const { userID, assignTo } = req.body;

  //compair between userIDFromToken & userID
  if (userIDFromToken != userID)
    return next(new Error("your ID is wrong", { cause: 400 }));

  //check assignTo
  const assignToUser = await User.findById(assignTo);
  if (!assignToUser)
    return next(
      new Error("You try assign task to someone not exist!", { cause: 400 })
    );
  
  const createTask = await Task.create(req.body);

  if (!createTask) return next(new Error("create task failed"));

  return res.status(201).json({
    success: true,
    message: "Task added successfully!",
  });
};

//========================update task========================//
export const updateTask = async (req, res, next) => {
  const userIDFromToken = req.payload.id;
  const { userID, taskID } = req.query;

  //check creator
  if (userIDFromToken != userID)
    return next(new Error("You aren't the creator", { cause: 401 }));

  //update task
  const updatedTask = await Task.findByIdAndUpdate({ _id: taskID }, req.body);

  if (!updatedTask) return next(new Error("Updated fail", { cause: 400 }));

  return res.status(200).json({ message: "Task updated successfully!" });
};

//========================delete task========================//
export const deleteTask = async (req, res, next) => {
  const userIDFromToken = req.payload.id;
  const { userID, taskID } = req.query;

  //check creator
  if (userIDFromToken != userID)
    next(new Error("You aren't the creator", { cause: 401 }));

  //delete task
  const deletedTask = await Task.findByIdAndDelete(taskID);

  if (!deletedTask) return next(new Error("Task not found", { cause: 400 }));

  return res.status(200).json({
    success: true,
    message: "deleted success!",
  });
};

//========================get all tasks with user data========================//
export const getAllTasksWithUserData = async (req, res, next) => {
  const allTasks = await Task.find().populate([{ path: "userID" }]);
  if (!allTasks) return next(new Error("There are no tasks", { cause: 404 }));

  return res.status(200).json({
    allTasks,
  });
};

//========================get tasks of oneUser with user data========================//
export const getTasksOfOneUseWithUserData = async (req, res, next) => {
  const userIDFromToken = req.payload.id;
  const taskWithUser = await Task.find({ userID: userIDFromToken }).populate([
    { path: "userID" },
  ]);
  if (!taskWithUser) return next(new Error("There is no task", { cause: 404 }));

  return res.status(200).json({
    taskWithUser,
  });
};

//========================get all tasks that not done after deadline========================//
export const getAllTAsksThatNotDoneAfterDeadline = async (req, res, next) => {
  const currentDate = new Date();
  const tasks = await Task.find({
    status: { $in: ["toDo", "doing"] },
    deadline: { $lt: currentDate },
  });
  if (!tasks.length)
    return next(new Error("There is no task found!", { cause: 404 }));
  return res.status(200).json({
    tasks,
  });
};
