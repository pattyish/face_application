import DbOperation from "../db/dbOperation";

const DbQuery = new DbOperation("users");
class CheckImage {
  async findImage(req, res) {
    const { id } = req.params;
    const isImageValid = await DbQuery.selectByField("imageid", id);
    if (isImageValid.rowNumber <= 0) 
    return res.status(404).json({
        status: 404,
        message: 'user with this image id is not found'
    });
    if (!isImageValid)
      return res.status(500).json({
        status: 500,
        message: "there is problem in db operation"
      });
    res.status(200).json({
      status: 200,
      message: "request successful",
      data: {
        isImageValid
      }
    });
  }
}

export { CheckImage as default };
