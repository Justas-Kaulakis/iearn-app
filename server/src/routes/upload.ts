import express, { RequestHandler } from "express";
import fileUpload from "express-fileupload";
import { InitializedSession, Session } from "express-session";
import shortid from "shortid";
import { ProjectImage } from "../entities/ProjectImage";
import { SERVER_URL } from "../constants";
import { getConnection } from "typeorm";
import { Project } from "../entities/Project";

const router = express.Router();

export const check: RequestHandler = (req, res, next) => {
  //console.log("GOT POST REQUEST");
  //console.log(req.headers.cookie);
  type sessionType = (Session | InitializedSession) & { adminId: number };
  if (!(req.session as sessionType).adminId) {
    return res.json({
      error: {
        data: { title: "Įkėlimas:" },
        message: "Neleistinas įkėlimas. Prisijunkite.",
      },
    });
  }
  //if((req.session as sessionType).adminId !== req.headers.cookie)
  if (!req.files) {
    return res.json({
      error: {
        message: "Failas nebuvo gautas.",
      },
    });
  }
  next();
};
/// CKEDITOR SimpleFileUploadAdapter

/// Stores image to api/temp/
router.post("/projects/upload", fileUpload(), check, async (req, res) => {
  console.log("Express Id: ", req.query?.id);

  const intId = parseInt(req.query.id as string);

  /// check if project of "id" exists
  const data = await getConnection()
    .createQueryBuilder()
    .select(`EXISTS(SELECT 1 FROM project WHERE id=${intId})`)
    .from(Project, "project")
    .getRawOne();
  if (!data.exists) {
    return res.json({
      error: {
        data: { title: "Blogas ID:" },
        message: "Projektas į kurį keliate nuotraukas - neegzistuoja.",
      },
    });
  }

  const file = req.files!.upload as fileUpload.UploadedFile;

  const filename = `${shortid.generate()}-${file.name}`;

  file.mv(`${__dirname}/../../api/images/project/${filename}`, (err) => {
    if (err) {
      console.log("CKEditor Error moving uploaded images to folder");
      console.error(err);
      return res.json({
        error: {
          message: "CKEditor Error moving uploaded images to folder",
        },
      });
    }

    ProjectImage.create({
      imageName: filename,
      projectId: intId,
    }).save();
    const url = `${SERVER_URL}/api/images/project/${filename}`;
    console.log(" Stored Url: ", url);
    return res.json({ url });
  });
});

export default router;
