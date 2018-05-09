var fs = Npm.require('fs');

Meteor.methods({
  'file-upload': function (fileName, fileData) {
    check(fileName, String);

    console.log("received file " + fileName);
    var uploadDir = process.env.PWD + '/.uploads/';
    var data_index = fileData.indexOf('base64') + 7;
    var filedata = fileData.slice (data_index, fileData.length);
    var decode_file = new Buffer(filedata, 'base64');

    if (!fs.existsSync(uploadDir)) {
      try {
        fs.mkdir(uploadDir, 0777, function (err) {
          if (err) {
            console.log('failed to create directory', err);
            return err;
          }
          else {
            fs.writeFile(uploadDir+"/"+fileName, decode_file, function(err1) {
              if (err1) {
                return console.log (err1);
              }
            });
          }
          return true;
        });
      } catch (e) {
        throw new Meteor.Error(500, 'exception in ', e);
      }
    } else {
      fs.writeFile(uploadDir+"/"+fileName, decode_file, function(err1) {
        if (err1) {
          return console.log (err1);
        }
      });
      return true;
    }
  },

  'move-file': function (tmpname, newid) {
    check(tmpname, String);
    check(newid, String);
    var oldpath = process.env.PWD + '/.uploads/' + tmpname;
    var newpath = process.env.PWD + '/.uploads/' + newid + '/' + tmpname;
    var newdir = process.env.PWD + '/.uploads/' + newid;

    if (!fs.existsSync(newdir)) {
      try {
        fs.mkdir(newdir, 0777, function (err) {
          if (err) {
            console.log('failed to create directory', err);
            return err;
          } else {
            fs.renameSync(oldpath, newpath);
          }
        });
      } catch (e) {
        throw new Meteor.Error(500, 'exception in ', e);
      }
    } else {
      fs.renameSync(oldpath, newpath);
    }
    return true
  }
});