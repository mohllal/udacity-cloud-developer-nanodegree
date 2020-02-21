import { Router, Request, Response } from "express";
import { filterImageFromURL, deleteLocalFiles } from "../../../../util/util";
import Joi from "@hapi/joi";
import Jimp from "jimp";

const router: Router = Router();

// GET /filteredimage?image_url={{URL}}
// endpoint to filter an image from a public url.
// IT SHOULD
//    1
//    1. validate the image_url query
//    2. call filterImageFromURL(image_url) to filter the image
//    3. send the resulting file in the response
//    4. deletes any files on the server on finish of the response
// QUERY PARAMATERS
//    image_url: URL of a publicly accessible image
// RETURNS
//   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]
/**************************************************************************** */

router.get("/filteredimage", async (req: Request, res: Response) => {
  const schema = Joi.object({
    image_url: Joi.string()
      .uri()
      .required()
  });

  // validate the request query
  let { error, value } = schema.validate(req.query, { allowUnknown: true });
  if (error) {
    return res.status(400).json({
      status: "BAD_REQUEST",
      message: error.message
    });
  }

  filterImageFromURL(req.query.image_url)
    .then(path => {
      res.sendFile(path, (error) => {
        deleteLocalFiles([path]);
      });
    })
    .catch(error => {
      console.log(error);
      return res.status(422).json({
        status: "UNPROCESSABLE ENTITY",
        message: "Error while processing the image!"
      });
    });
});

export const ImageRouter: Router = router;
