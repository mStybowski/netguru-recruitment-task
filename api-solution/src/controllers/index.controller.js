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

export { renderIndex, renderAPIDocumentation };
