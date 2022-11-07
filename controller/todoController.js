const ToDo = require("../model/todoList");

module.exports.createTodo = async (req, res, next) => {
  try {
    const { topicHeading, topicSummary } = req.body;

    let query = await ToDo.create({
      topicHeading: topicHeading,
      topicSummary: topicSummary,
    });

    if (!query) {
      return res.status(400).json({ message: "Error creating" });
    }

    return res.status(200).json({ message: "Create !", res: query });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal Error", err: error });
  }
};

module.exports.getTodo = async (req, res, next) => {
  try {
    let query = await ToDo.findAll();

    if (!query) {
      return res.status(400).json({ message: "Not found !" });
    }

    return res.status(200).json({ message: "todo found !", res: query });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal Error", err: error });
  }
};

module.exports.updateTodo = async (req, res, next) => {
  try {
    const { topicHeading, topicSummary } = req.body;
    let query = await ToDo.update(
      {
        topicHeading: topicHeading,
        topicSummary: topicSummary,
      },
      {
        where: { id: req.params.id },
      }
    );
    if (!query) {
      return res.status(400).json({ message: "Not Updated !" });
    }

    return res.status(200).json({ message: "todo Updated !", res: query });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal Error", err: error });
  }
};

module.exports.deleteTodo = async (req, res, next) => {
  try {
    let query = await ToDo.destroy({
      where: { id: req.params.id },
    });

    if (!query) {
      return res.status(400).json({ message: "Error" });
    }

    return res.status(200).json({ message: "todo deleted !" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal error!", error });
  }
};
