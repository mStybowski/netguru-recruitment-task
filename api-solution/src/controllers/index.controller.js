const renderIndex = async (req, res) => {
  console.log("renderIndex controller");
  try {
    res.status(200).send("IndexPage");
  } catch (error) {
    console.error("renderIndex", error);
    res.status(500).send({
      message: "There was an error at renderIndex controller.",
    });
  }
};

const renderAPIDocumentation = async (req, res) => {
  console.log("renderAPIDocumentation controller");
  try {
    res.status(200).send("API Documentation");
  } catch (error) {
    console.error("renderAPIDocumentation", error);
    res.status(500).send({
      message: "There was an error at renderAPIDocumentation controller.",
    });
  }
};

const notFound = async (req, res) => {
  console.log("notFound controller");
  try {
    res.status(404).json({
      status: 404,
      message: "Route not found",
    });
  } catch (error) {
    console.error("renderAPIDocumentation", error);
    res.status(500).send({
      message: "There was an error at renderAPIDocumentation controller.",
    });
  }
};

export { renderIndex, renderAPIDocumentation, notFound };
