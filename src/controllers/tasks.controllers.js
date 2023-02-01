import Task from '../models/Task'
import { getPagination } from '../libs/getPagination'

export const findAllTasks = async (req, res, next) => {
  try {
    const { page, size, title } = req.query
    const search = title
      ? { title: { $regex: new RegExp(title), $options: 'i' } }
      : {}
    const { limit, offset } = getPagination(page, size)
    const data = await Task.paginate(search, { offset, limit })

    res.json({
      info: {
        totalTasks: data.totalDocs,
        currentPage: data.page - 1,
        nextPage: data.nextPage - 1,
        totalPages: data.totalPages,
      },
      tasks: data.docs,
    })
  } catch (error) {
    next(error)
  }
}

export const findTaskById = async (req, res, next) => {
  const { id } = req.params

  try {
    const task = await Task.findById(id)

    if (task === null) {
      return res.status(404).json({
        message: `the task with id: ${id} does not exist`,
      })
    }

    res.json(task)
  } catch (error) {
    next(error)
  }
}

export const findTasksDone = async (req, res, next) => {
  try {
    const taskDone = await Task.find({ done: true })

    res.json(taskDone)
  } catch (error) {
    next(error)
  }
}

export const findPendingTasks = async (req, res, next) => {
  try {
    const pendingTask = await Task.find({ done: false })

    res.json(pendingTask)
  } catch (error) {
    next(error)
  }
}

export const createTask = async (req, res, next) => {
  const data = req.body

  try {
    const newTask = new Task(data)
    await newTask.save()

    res.json({
      task: newTask,
    })
  } catch (error) {
    next(error)
  }
}

export const updateTask = async (req, res, next) => {
  const { id } = req.params
  const data = req.body

  try {
    await Task.findByIdAndUpdate(id, data)

    res.json({
      message: `The task with the id: ${id} was updated`,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteTask = async (req, res, next) => {
  const { id } = req.params

  try {
    await Task.findByIdAndDelete(id)

    res.json({
      message: `The task with the id: ${id} was deleted`,
    })
  } catch (error) {
    next(error)
  }
}
