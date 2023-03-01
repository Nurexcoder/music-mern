const express = require("express");
const router = express.Router();
const multer = require("multer");
// const firebase = require("firebase");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");

const storage = getStorage();

const Music = require("../models/Music");
const fetchUser = require("./fetchUser");
const User = require("../models/User");
// const musicMetaData=require('music-metadata')
// const { Musics } = require("../models/Music");

router.post("/", [fetchUser, multer().array("files")], async (req, res) => {
  try {
    if (!req.files) {
      res.status(206).send("Please insert a image");
      return;
    }
    console.log(req.user);
    // return;
    let metadataCover = {
      contentType: req.files[0].mimetype,
      name: req.files[0].originalname,
    };
    console.log(metadataCover);
    // if(metadataCover.contentType!=)
    // storage.put(req.file.buffer, metadata);
    // }

    const coverStorageRef = ref(storage, `${req.files[0].originalname}`);
    const coverSnapshot = await uploadBytes(
      coverStorageRef,
      req.files[0].buffer,
      metadataCover
    );

    const coverDownloadUrl = await getDownloadURL(coverSnapshot.ref);
    let metadataSong = {
      contentType: req.files[1].mimetype,
      name: req.files[1].originalname,
    };
    console.log(metadataSong);
    const songStorageRef = ref(storage, `${req.files[1].originalname}`);
    const songSnapshot = await uploadBytes(
      songStorageRef,
      req.files[1].buffer,
      metadataSong
    );
    const songDownloadUrl = await getDownloadURL(songSnapshot.ref);

    const MusicData = await Music.create({
      name: req.body.name,
      coverAlbum: coverDownloadUrl,
      song: songDownloadUrl,
      description: req.body.description,
      artist: req.body.artist,
      uploadedBy: req.user.id,
    });
    res.json(MusicData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error!");
  }
});

router.get("/", fetchUser, async (req, res) => {
  try {
    const songs = await Music.find({ uploadedBy: req.user.id });
    res.status(200).json(songs);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    console.log(req.params);
    const music = await Music.findById(req.params.id);
    if (!music) {
      throw new Error("Invalid id");
    }
    const musicRef = ref(storage, music.song);
    await deleteObject(musicRef);
    const coverRef = ref(storage, music.coverAlbum);
    await deleteObject(coverRef);
    music.delete();

    // await Music.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: "File deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
});

module.exports = router;
